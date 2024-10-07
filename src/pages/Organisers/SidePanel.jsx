import React, { useState } from 'react';
import { db } from '../../firebase';
import Modal from '../../utils/Modals'; // Import the Modal component
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';

const SidePanel = ({ userId, organizerId, organizerName,userName }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 6:00 PM'); // Default time slot, can be made dynamic

  const handleBookAppointment = () => {
    if (!selectedDate) {
      alert('Please select an appointment date.');
      return;
    }
    setModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    setModalOpen(false);
    try {
      // Create a new booking in the bookings collection
      const bookingRef = await addDoc(collection(db, 'bookings'), {
        userId: userId, // Associate the booking with the user
        userName: userName,
        appointmentTime: timeSlot, // Use the selected time slot
        date: selectedDate, // Use the selected date
        status: 'Booked',
        organizerId: organizerId, // Add organizer ID
        organizerName: organizerName, // Add organizer name
      });

      // Get the user's document reference
      const userDocRef = doc(db, 'users', userId);
      
      // Fetch the user document data
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        // Update the user's document to add the booking reference
        await updateDoc(userDocRef, {
          bookings: [...(userDocSnap.data().bookings || []), bookingRef.id], // Add booking ID to user's bookings array
        });
        alert('Appointment booked successfully!');
      } else {
        console.error("No such document in users collection!");
        alert('User not found. Please try again.');
      }
    } catch (error) {
      console.error("Error adding booking: ", error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className='shadow-lg p-3 lg:p-5 rounded-md'>
      <div className='flex items-center justify-between'>
        <p className='text__para mt-0 font-semibold'>Appointment Fee</p>
        <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
          ₹10
        </span>
      </div>
      <div className='mt-[30px]'>
        <p className='text__para mt-0 font-semibold text-headingColor'>
          Available Time Slots:
        </p>
        <ul className='mt-3'>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
            <li className='flex items-center justify-between mb-2' key={day}>
              <p className='text-[15px] leading-6 text-textColor font-semibold'>
                {day}
              </p>
              <p className='text-[15px] leading-6 text-textColor font-semibold'>
                10:00 AM - 6:00 PM
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Date picker for selecting appointment date */}
      <div className='mt-5'>
        <label className='text__para mt-0 font-semibold'>Select Appointment Date:</label>
        <input 
          type='date' 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)} 
          className='border p-2 mt-2 w-full rounded-md'
        />
      </div>

      <button 
        onClick={handleBookAppointment} 
        className='btn px-2 w-full rounded-md mt-5'>
        Book Appointment
      </button>
      
      {/* Modal for confirmation */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={handleConfirmBooking} 
      />
    </div>
  );
};

export default SidePanel;
