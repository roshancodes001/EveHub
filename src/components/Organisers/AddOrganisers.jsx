import React from "react";
import { db } from "../../firebase";  // Import Firestore instance
import { collection, addDoc } from "firebase/firestore";
import { organisers } from "../../assets/data/organisers"; // Import the sample data

const AddOrganisers = () => {
  const handleAddOrganisers = async () => {
    try {
      const organisersCollection = collection(db, "users"); // Reference to "users" collection

      for (const organiser of organisers) {
        await addDoc(organisersCollection, {
          name: organiser.name,
          specialization: organiser.specialization,
          avgRating: organiser.avgRating,
          totalRating: organiser.totalRating,
          photo: organiser.photo, // URL for profile image
          totalEvents: organiser.totalEvents,
          address: organiser.address,
          experience: organiser.experience || 5, // Default experience if not provided
          topEvents: organiser.topEvents || [],
          availableTimings: organiser.availableTimings || [],
          role: "organizer", // To differentiate organizers from users
        });
      }

      alert("Organizers added successfully! ✅");
    } catch (error) {
      console.error("Error adding organizers:", error);
      alert("Failed to add organizers ❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button 
        onClick={handleAddOrganisers} 
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Add Organizers to Firestore
      </button>
    </div>
  );
};

export default AddOrganisers;
