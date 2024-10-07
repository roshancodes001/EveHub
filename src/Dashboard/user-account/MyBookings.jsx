import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Import auth and db from your firebase config

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); // Store user's role
  const [clientName,setClientName] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error('No authenticated user found.');
        setLoading(false); // Ensure loading is false if no user is found
        return;
      }

      const userId = currentUser.uid;
      console.log("Current User ID:", userId); // Log user ID for debugging

      try {
        // Query the "users" collection to fetch the user's role
        const usersRef = collection(db, 'users');
        const userQuery = query(usersRef, where('uid', '==', userId));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
          console.error('User not found in users collection.');
          setLoading(false); // Ensure loading is false if user is not found
          return;
        }

        // Extract the user's role from the fetched document
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        const role = userData.role;
        console.log("User Role:", role); // Log the user role
        setUserRole(role); // Set the user role state

        // Now query the "bookings" collection based on the user's role
        let bookingQuery;
        const bookingsRef = collection(db, 'bookings');

        if (role === 'customer') {
          bookingQuery = query(bookingsRef, where('userId', '==', userId));
        } else if (role === 'organiser') { // Check if role is 'organizer'
          bookingQuery = query(bookingsRef, where('organizerId', '==', userId));
        } else {
          console.warn('User role is not recognized. No bookings will be fetched.');
          setLoading(false); // Set loading to false if role is unrecognized
          return;
        }

        const bookingSnapshot = await getDocs(bookingQuery);
        const bookingsData = bookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Log the fetched bookings data
        console.log("Fetched Bookings Data:", bookingsData);
        setBookings(bookingsData); // Set bookings

      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  function getuser(booking){
    if(userRole=='organiser'){
      return booking.userName;
    }else{
      return booking.organizerName;
    }
  }

  // Separate bookings into past and upcoming
  const currentDate = new Date();
  const pastBookings = bookings.filter(booking => new Date(booking.date) < currentDate);
  const upcomingBookings = bookings.filter(booking => new Date(booking.date) >= currentDate);

  return (
    <div className="bookings-container p-6 bg-gray-50 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

    

      {/* Upcoming Appointments */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Upcoming Appointments</h3>
        {upcomingBookings.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingBookings.map(booking => (
              <li key={booking.id} className="bg-white p-4 rounded-lg shadow-md">
                <p><strong>Booking ID:</strong> {booking.id}</p>
                <p><strong>User Name:</strong> {getuser(booking)}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Time Slot:</strong> {booking.appointmentTime}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No upcoming appointments.</p>
        )}
      </div>

      {/* Past Appointments */}
      <div>
        <h3 className="text-xl font-semibold text-red-600 mb-4">Past Appointments</h3>
        {pastBookings.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastBookings.map(booking => (
              <li key={booking.id} className="bg-white p-4 rounded-lg shadow-md">
                <p><strong>Booking ID:</strong> {booking.id}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Time Slot:</strong> {booking.appointmentTime}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No past appointments.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
