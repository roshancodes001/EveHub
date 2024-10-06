import { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { authContext } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useContext(authContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    availableTimings: [], // Initialize with empty array
    fee: ''
  });
  const [organizerData, setOrganizerData] = useState({
    specialization: '',
    avgRating: 0,
    totalRating: 0,
    totalEvents: 0,
    address: '',
    about: '',
    topEvents: [],
    experience: []
  });
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState('');
  const [topEvents, setTopEvents] = useState([]);
  const [experience, setExperience] = useState([]);
  const [availableTimings, setAvailableTimings] = useState([
    { day: 'Sunday', startTime: '', endTime: '' },
    { day: 'Monday', startTime: '', endTime: '' },
    { day: 'Tuesday', startTime: '', endTime: '' },
    { day: 'Wednesday', startTime: '', endTime: '' },
    { day: 'Thursday', startTime: '', endTime: '' },
    { day: 'Friday', startTime: '', endTime: '' },
    { day: 'Saturday', startTime: '', endTime: '' }
  ]);
  const [fee, setFee] = useState('');

  const fetchUserData = async () => {
    if (user?.uid) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            ...data,
            availableTimings: data.availableTimings || [], // Ensure this is always an array
            fee: data.fee || ''
          });
          setNewName(data.name || '');
          setNewEmail(data.email || '');
          
          if (data.role === 'organiser') {
            setOrganizerData({
              specialization: data.specialization || '',
              avgRating: data.avgRating || 0,
              totalRating: data.totalRating || 0,
              totalEvents: data.totalEvents || 0,
              address: data.address || '',
              about: data.about || '',
              topEvents: data.topEvents || [],
              experience: data.experience || []
            });
            setAbout(data.about || '');
            setTopEvents(data.topEvents || []);
            setExperience(data.experience || []);
            setAvailableTimings(data.availableTimings || availableTimings);
            setFee(data.fee || '');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.uid]);

  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
  };

  const handleSave = async () => {
    try {
      if (!user?.uid) {
        console.error('No user ID found');
        return;
      }

      const userDocRef = doc(db, 'users', user.uid);
      const updateData = {
        name: newName,
        email: newEmail,
        availableTimings,
        fee
      };

      if (userData.role === 'organiser') {
        Object.assign(updateData, {
          specialization: organizerData.specialization,
          totalEvents: organizerData.totalEvents,
          address: organizerData.address,
          avgRating: organizerData.avgRating,
          totalRating: organizerData.totalRating,
          about,
          topEvents,
          experience
        });
      }

      await updateDoc(userDocRef, updateData);
      setUserData(prev => ({
        ...prev,
        ...updateData
      }));
      setIsEditing(false);

    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

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

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2 className='text-[20px] font-bold'>Profile Settings</h2>
      <div className='mt-4'>
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
            <p className='text-md font-medium'>{userData.name || 'FVENTS'}</p>
          )}
        </div>

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
            <p className='text-md font-medium'>{userData.email || 'fvents@gmail.com'}</p>
          )}
        </div>

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
              <label className='block text-sm font-medium text-gray-700'>About</label>
              {isEditing ? (
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className='w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor'
                />
              ) : (
                <p className='text-md font-medium'>{about || 'About the organizer'}</p>
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-md font-bold">Top Events</h4>
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
            </div>

            <div className="mb-4">
              <h4 className="text-md font-bold">Available Timings</h4>
              {availableTimings.map((timing, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium">{timing.day}</span>
                  {isEditing ? (
                    <>
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
                    </>
                  ) : (
                    <span className="text-md font-medium">
                      {timing.startTime ? `${timing.startTime} to ${timing.endTime}` : 'Not set'}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Fee</label>
              {isEditing ? (
                <input
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                />
              ) : (
                <p className="text-md font-medium">{fee || 'Not Set'}</p>
              )}
            </div>
          </>
        )}

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