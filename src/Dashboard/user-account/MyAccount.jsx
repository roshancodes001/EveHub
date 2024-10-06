import { useContext, useState, useEffect } from 'react';
import { authContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import MyBookings from './MyBookings';
import Profile from './Profile';
import { db } from '../../firebase'; // Import Firebase
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, deleteUser } from 'firebase/auth'; // Import deleteUser
import userImg from '../../assets/images/organiser-img01.png'; // Default Image

const MyAccount = () => {
  const { user, dispatch } = useContext(authContext);
  const [tab, setTab] = useState('bookings');
  const [profileImage, setProfileImage] = useState(userImg); // Default to userImg
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from Firestore
  const fetchUserData = async () => {
    try {
      if (user?.uid) {
        const userDocRef = doc(db, 'users', user.uid); // Fetch from Firestore
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data); // Store user data
          setProfileImage(data.photo || userImg); // Use Firestore image or fallback
        } else {
          console.log("No user data found!");
        }
      }
    } catch (error) {
      setError("Error fetching user data");
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.uid]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // Function to delete user account with confirmation
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    
    if (!confirmDelete) return; // If user cancels, do nothing

    const auth = getAuth();
    try {
      // Delete Firestore document
      if (user?.uid) {
        await deleteDoc(doc(db, 'users', user.uid)); // Delete user document from Firestore
      }

      // Delete authentication user
      await deleteUser(auth.currentUser); // Delete user from authentication

      // Logout the user
      handleLogout();

      // Optionally, redirect to a different page after deletion
      // e.g., history.push('/goodbye');
    } catch (error) {
      setError("Error deleting account");
      console.error("Error deleting account:", error);
    }
  };

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className='grid md:grid-cols-3 gap-10'>
          <div className='pb-[50px] px-[30px] rounded-md'>
            <div className='flex items-center justify-center'>
              <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                {/* Use the profile image from Firestore or default */}
                <img 
                  src={profileImage} 
                  alt='user-profile-avatar' 
                  className='w-full h-full rounded-full'
                />
              </figure>
            </div>
            <div className='text-center mt-4'>
              <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>
                {userData ? userData.name : 'FVENTS'} {/* Display user name or default */}
              </h3>
              <p className='text-textColor text-[15px] leading-6 font-medium'>
                {userData ? userData.email : 'fvents@gmail.com'} {/* Display email or default */}
              </p>
            </div>
            <div className='mt-[50px] md:mt-[100px]'>
              <Link to='/login'>
                <button 
                  onClick={handleLogout} 
                  className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'
                >
                  Logout
                </button>
              </Link>
              <button 
                onClick={handleDeleteAccount} 
                className='w-full bg-red-600 p-3 mt-4 text-[16px] leading-7 rounded-md text-white'
              >
                Delete Account
              </button>
              {error && <p className="text-red-600">{error}</p>} {/* Display error if any */}
            </div>
          </div>

          <div className='md:col-span-2 md:px-[30px]'>
            <div>
              <button 
                onClick={() => setTab('bookings')} 
                className={`${
                  tab === 'bookings' ? 'bg-primaryColor text-white font-normal' : 'text-headingColor'
                } p-2 px-5 rounded-md text-[16px] leading-7 border border-solid border-primaryColor mr-5`}
              >
                My Booking
              </button>

              <button 
                onClick={() => setTab('settings')} 
                className={`${
                  tab === 'settings' ? 'bg-primaryColor text-white font-normal' : 'text-headingColor'
                } p-2 px-5 rounded-md text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Profile Settings
              </button>
            </div>

            {/* Display content based on tab */}
            {tab === 'bookings' ? (
              loading ? (
                <p>Loading bookings...</p>
              ) : userData?.bookings?.length > 0 ? (
                <MyBookings />
              ) : (
                <p>No bookings yet.</p>
              )
            ) : (
              <Profile />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
