import { useState, useEffect } from 'react'; 
import { db } from '../../firebase'; // Firebase import
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore methods
import { useContext } from 'react';
import { authContext } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useContext(authContext); // Get the user from context
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [userData, setUserData] = useState({ name: '', email: '', role: '' }); // Store user data
  const [organizerData, setOrganizerData] = useState({
    specialization: '',
    avgRating: 0,
    totalRating: 0,
    totalEvents: 0,
    address: ''
  }); // Store organiser-specific data
  const [newName, setNewName] = useState(''); // Store updated name
  const [newEmail, setNewEmail] = useState(''); // Store updated email
  const [loading, setLoading] = useState(true); // Loading state
  const [about, setAbout] = useState(organizerData.about || '');
const [topEvents, setTopEvents] = useState(organizerData.topEvents || []);
const [experience, setExperience] = useState(organizerData.experience || []);

const [availableTimings, setAvailableTimings] = useState([
  { day: 'Sunday', startTime: '', endTime: '' },
  { day: 'Monday', startTime: '', endTime: '' },
  { day: 'Tuesday', startTime: '', endTime: '' },
  { day: 'Wednesday', startTime: '', endTime: '' },
  { day: 'Thursday', startTime: '', endTime: '' },
  { day: 'Friday', startTime: '', endTime: '' },
  { day: 'Saturday', startTime: '', endTime: '' }
]); // Store available timings for each day

const [fee, setFee] = useState(''); // Store organizer's fee



  // Function to fetch user data from Firestore
  const fetchUserData = async () => {
    if (user?.uid) {
      try {
        const userDocRef = doc(db, 'users', user.uid); // Reference to user document in Firestore
        const userDoc = await getDoc(userDocRef); // Get the user document
        if (userDoc.exists()) {
          const data = userDoc.data(); // Extract the data
          setUserData(data); // Set the user data to state
          setNewName(data.name || ''); // Set the initial name
          setNewEmail(data.email || ''); // Set the initial email
          
          if (data.role === 'organiser') {
            setOrganizerData({
              specialization: data.specialization || '',
              avgRating: data.avgRating || 0,
              totalRating: data.totalRating || 0,
              totalEvents: data.totalEvents || 0,
              address: data.address || ''
            });
          }
        } else {
          console.error('No user document found!');
        }
      } catch (error) {
        console.error('Error fetching user data from Firestore:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when the component mounts
  }, [user?.uid]);

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing((prevState) => !prevState); // Toggle between view and edit mode
  };

  // Save the updated user and organiser details to Firestore
  const handleSave = async () => {
    try {
      // Update the general user document
      const userDocRef = doc(db, 'users', user.uid); // Reference to user document
      await updateDoc(userDocRef, {
        name: newName,
        email: newEmail,
        specialization: organizerData.specialization,
        totalEvents: organizerData.totalEvents,
        address: organizerData.address,
        avgRating: organizerData.avgRating,
        totalRating: organizerData.totalRating,
        availableTimings,  // Add available timings to Firestore
        fee                 // Add fee to Firestore
      });
  
      // Update local user data state with new values
      setUserData({ ...userData, name: newName, email: newEmail });
  
      // Check if userData.uid is valid
      if (!userData.uid) {
        console.error('Error: userData.uid is undefined or null');
        return;
      }
  
      // Update the organizer document (stored in the same users collection but with different role)
      const organizerDocRef = doc(db, 'users', userData.uid); // Reference to the organizer document
      await updateDoc(organizerDocRef, {
        about, // Updated about section
        topEvents, // Updated array of top events
        experience // Updated array of experience
      });
  
      // Optionally update the local state for organizer data as well
      setOrganizerData({ ...organizerData, about, topEvents, experience });
  
      setIsEditing(false); // Exit edit mode
  
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

    
  if (loading) {
    return <p>Loading profile...</p>; // Display loading text while fetching data
  }

  const handleAddTopEvent = () => {
    setTopEvents([...topEvents, { eventDate: '', title: '', location: '' }]);
  };

  const handleEventChange = (index, field, value) => {
    const newEvents = [...topEvents];
    newEvents[index][field] = value;
    setTopEvents(newEvents);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { years: '', field: '' }]);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };

  const handleTimingChange = (index, field, value) => {
    const newTimings = [...availableTimings];
    newTimings[index][field] = value;
    setAvailableTimings(newTimings);
  };

  const handleFeeChange = (e) => {
    setFee(e.target.value);
  };


  return (
    <div>
      <h2 className='text-[20px] font-bold'>Profile Settings</h2>
      <div className='mt-4'>
        {/* Name */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Name</label>
          {isEditing ? (
            <input
              type='text'
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className='w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor'
            />
          ) : (
            <p className='text-md font-medium'>{userData.name || 'FVENTS'}</p> // Display name from Firestore
          )}
        </div>
  
        {/* Email */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Email</label>
          {isEditing ? (
            <input
              type='email'
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className='w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor'
            />
          ) : (
            <p className='text-md font-medium'>{userData.email || 'fvents@gmail.com'}</p> // Display email from Firestore
          )}
        </div>
        
        {/* Organizer Specific Details (Visible only for organisers) */}
        {userData.role === 'organiser' && (
          <>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Specialization</label>
              {isEditing ? (
                <input
                  type='text'
                  value={organizerData.specialization}
                  onChange={(e) =>
                    setOrganizerData({ ...organizerData, specialization: e.target.value })
                  }
                  className='w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor'
                />
              ) : (
                <p className='text-md font-medium'>{organizerData.specialization || 'Full Event'}</p>
              )}
            </div>          
  
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Total Events</label>
              {isEditing ? (
                <input
                  type='number'
                  value={organizerData.totalEvents}
                  onChange={(e) =>
                    setOrganizerData({ ...organizerData, totalEvents: Number(e.target.value) })
                  }
                  className='w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor'
                />
              ) : (
                <p className='text-md font-medium'>{organizerData.totalEvents}</p>
              )}
            </div>
  
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Address</label>
              {isEditing ? (
                <input
                  type='text'
                  value={organizerData.address}
                  onChange={(e) =>
                    setOrganizerData({ ...organizerData, address: e.target.value })
                  }
                  className='w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor'
                />
              ) : (
                <p className='text-md font-medium'>{organizerData.address || 'Adyar, Chennai'}</p>
              )}
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>About</label>
              {isEditing ? (
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className='w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor'
                />
              ) : (
                <p className='text-md font-medium'>{organizerData.about || 'About the organizer'}</p>
              )}
            </div>

            {topEvents.map((event, index) => (
          <div key={index} className='flex flex-col mb-2'>
            {isEditing ? (
              <>
                <input
                  type='text'
                  placeholder='Event Title'
                  value={event.title}
                  onChange={(e) => handleEventChange(index, 'title', e.target.value)}
                  className='border px-3 py-2 mb-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor'
                />
                <input
                  type='text'
                  placeholder='Event Date'
                  value={event.eventDate}
                  onChange={(e) => handleEventChange(index, 'eventDate', e.target.value)}
                  className='border px-3 py-2 mb-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor'
                />
                <input
                  type='text'
                  placeholder='Location'
                  value={event.location}
                  onChange={(e) => handleEventChange(index, 'location', e.target.value)}
                  className='border px-3 py-2 mb-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor'
                />
              </>
            ) : (
              <p className='text-md font-medium'>{`${event.title} - ${event.eventDate} at ${event.location}`}</p>
            )}
          </div>
        ))}
        {isEditing && (
          <button
            onClick={handleAddTopEvent}
            className='bg-primaryColor text-white px-4 py-2 mb-2 rounded-md'
          >
            Add Event
          </button>
        )}

        {experience.map((exp, index) => (
          <div key={index} className='flex flex-col mb-2'>
            {isEditing ? (
              <>
                <input
                  type='number'
                  placeholder='Years'
                  value={exp.years}
                  onChange={(e) => handleExperienceChange(index, 'years', e.target.value)}
                  className='border px-3 py-2 mb-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor'
                />
                <input
                  type='text'
                  placeholder='Field'
                  value={exp.field}
                  onChange={(e) => handleExperienceChange(index, 'field', e.target.value)}
                  className='border px-3 py-2 mb-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor'
                />
              </>
            ) : (
              <p className='text-md font-medium'>{`${exp.years} years in ${exp.field}`}</p>
            )}
          </div>
        ))}
        {isEditing && (
          <button
            onClick={handleAddExperience}
            className='bg-primaryColor text-white px-4 py-2 ml-2 mb-2 rounded-md'
          >
            Add Experience
          </button>
        )}

          <div className="mb-4">
            <h4 className="text-md font-bold">Available Timings</h4>
            {userData.availableTimings.map((timing, index) => (
              <p key={index} className="text-md font-medium">
                {`${timing.day}: ${timing.startTime || '--:--'} to ${timing.endTime || '--:--'}`}
              </p>
            ))}
          </div>

          <div className="mb-4">
            <h4 className="text-md font-bold">Fee</h4>
            <p className="text-md font-medium">{userData.fee || 'Not Set'}</p>
          </div>


        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Available Timings</label>
          {availableTimings.map((timing, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium">{timing.day}</span>
              <input
                type="time"
                value={timing.startTime}
                onChange={(e) => handleTimingChange(index, 'startTime', e.target.value)}
                className="border px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
              <span className="text-sm font-medium">to</span>
              <input
                type="time"
                value={timing.endTime}
                onChange={(e) => handleTimingChange(index, 'endTime', e.target.value)}
                className="border px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Fee</label>
          <input
            type="number"
            value={fee}
            onChange={handleFeeChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
          />
        </div>

  
            {/* Add more fields as needed */}
          </>
        )}
  
        {/* Edit/Save Buttons */}
        <div className='mt-2'>
          {isEditing ? (
            <button
              onClick={handleSave}
              className='bg-primaryColor text-white px-4 py-2 rounded-md mr-3'
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className='bg-primaryColor text-white px-4 py-2 rounded-md mr-3'
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default Profile;
