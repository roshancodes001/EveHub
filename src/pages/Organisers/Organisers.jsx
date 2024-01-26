import OrganiserCard from "../../components/Organisers/OrganiserCard";
import { organisers } from "./../../assets/data/organisers"

const Organisers = () =>{
    return <>
    <section className="bg-[#fff9ea]">
        <div className="container text-center">
            <h1 className="heading">Find a Organiser</h1>
            <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
                <input
                type="search"
                className="py-4 pl-4 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
                placeholder="Search for an organizer.."/>
                <button className="btn mt-0 rounded-[0px] rounded-r-md">
                    Search
                </button>

            </div>
        </div>
    </section>
    <section>
        <div className="container">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {organisers.map((organiser) => (
        <OrganiserCard key={organiser.id} organiser={organiser} />
      ))}
    </div>
        </div>
    </section>
    </>
};

export default Organisers;