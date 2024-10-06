import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the id from the route
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Import your db configuration
import organiserImg from "../../assets/images/organiser-img02.png";
import starIcon from "../../assets/images/Star.png";
import OrganiserAbout from "./OrganiserAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const OrganisersDetails = () => {
    const { id } = useParams(); // Get the organizer uid from the URL
    const [organiserData, setOrganiserData] = useState(null); // Store organizer data
    const [tab, setTab] = useState('about');
    const [role, setRole] = useState(null); // To store the user's role
    const [userId, setUserId] = useState(null); // To store the user ID

    useEffect(() => {
        // Fetch organiser details using the id (uid) from the route
        const fetchOrganiserDetails = async (organiserId) => {
            console.log(organiserId);
            try {
                const organiserDocRef = doc(db, 'users', organiserId); // Reference to the organiser document
                const organiserDoc = await getDoc(organiserDocRef);

                if (organiserDoc.exists()) {
                    setOrganiserData(organiserDoc.data()); // Set the organiser data
                    console.log(organiserData);
                } else {
                    console.log("No such organiser document!");
                }
            } catch (error) {
                console.error("Error fetching organiser details:", error);
            }
        };

        if (id) {
            fetchOrganiserDetails(id); // Fetch organiser data based on the id (uid)
        }
    }, [id]);

    useEffect(() => {
        // Fetch authenticated user details (if needed)
        const auth = getAuth(); // Get the Auth instance
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid); // Set the user ID
                await fetchUserDetails(user.uid); // Fetch user details with the user ID
            } else {
                console.log("No user is signed in.");
            }
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, []);

    const fetchUserDetails = async (userId) => {
        try {
            const userDocRef = doc(db, 'users', userId); // Reference to user document
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userDetails = userDoc.data();
                setRole(userDetails.role); // Assuming role is a field in the user document
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    return (
        <section>
            <div className="max-w-[1170px] px-5 mx-auto">
                <div className="grid md:grid-cols-3 gap-[50px]">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-5">
                            <figure className="max-w-[200px] max-h-[200px]">
                                <img src={organiserData?.photo || organiserImg} className="rounded-[10px]" alt="Organizer" />
                            </figure>
                            <div>
                                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg-px6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                                    {organiserData?.specialization || "Concert"}
                                </span>
                                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                                    {organiserData?.name || "Organizer Name"}
                                </h3>
                                <div className="flex items-center gap-[6px]">
                                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                                        <img src={starIcon} alt="star"/> {organiserData?.avgRating || 0}
                                    </span>
                                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] font-semibold text-textColor">
                                        ({organiserData?.totalRating || 0})
                                    </span>
                                </div>
                                <p className="text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                                    {organiserData?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                                </p>
                            </div>
                        </div>

                        <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                            <button 
                                onClick={() => setTab('about')}
                                className={`${tab === 'about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                            >
                                About
                            </button>
                            <button 
                                onClick={() => setTab('feedback')}
                                className={`${tab === 'feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                            >
                                Feedbacks
                            </button>
                        </div>
                        <div className="mt-[50px]">
                            {tab === 'about' && <OrganiserAbout data={organiserData}/>} 
                            {tab === 'feedback' && <Feedback />}
                        </div>
                    </div>
                    {/* Conditionally render the SidePanel based on the user's role */}
                    {role === 'customer' && <SidePanel userId={userId} />}
                </div>
            </div>
        </section>
    );
};

export default OrganisersDetails;
