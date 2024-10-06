import { useState, useEffect } from "react";
import OrganiserCard from "../../components/Organisers/OrganiserCard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path to your Firebase config

const Organisers = () => {
  const [organisers, setOrganisers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch organisers from Firebase where role is 'organiser'
  useEffect(() => {
    const fetchOrganisers = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "organiser"));
        const querySnapshot = await getDocs(q);
        const organisersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrganisers(organisersData);
      } catch (error) {
        console.error("Error fetching organisers: ", error);
      }
    };

    fetchOrganisers();
  }, []);

  // Filter organisers based on the search term
  const filteredOrganisers = organisers.filter((organiser) =>
    organiser.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h1 className="heading">Find an Organiser</h1>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search for an organiser.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredOrganisers.map((organiser) => (
              <OrganiserCard key={organiser.id} organiser={organiser} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Organisers;
