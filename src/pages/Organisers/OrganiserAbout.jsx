import { useEffect } from 'react';
import { formateDate } from '../../utils/formatDate'; // Assuming formateDate is a utility function for formatting dates

const OrganiserAbout = ({ data }) => {
    useEffect(() => {
        console.log(data); // This will log the data object when the component mounts
    }, [data]);

    return (
        <div>
            {/* About Section */}
            <div>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                    About 
                    <span className='text-irisBlueColor font-bold text-[24px] leading-9'>
                        {data?.name || 'Organiser'} {/* Organiser's name */}
                    </span>
                </h3>
                <p className='text__para'>
                    {data?.about || 'About information is not updated'}
                </p>
            </div>

            {/* Top Events Conducted Section */}
            <div className='mt-12'>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                    Top Events Conducted
                </h3>
                <ul className='pt-4 md:p-5'>
                    {data?.topEvents?.length > 0 ? (
                        data.topEvents.map((event, index) => (
                            <li
                                key={index}
                                className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'
                            >
                                <div>
                                    <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                                       {event.eventDate}
                                    </span>
                                    <p className='text-[16px] leading-6 font-bold text-textColor'>
                                        {event.title}
                                    </p>
                                </div>
                                <p className='text-[14px] leading-5 font-medium text-textColor'>
                                    {event.location}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className='text-[16px] text-textColor'>
                            No events conducted yet.
                        </p>
                    )}
                </ul>
            </div>

           {/* {/ Experience Section /}
            <div className='mt-12'>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                    Experience
                </h3>
                <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
                    {data?.experience?.length > 0 ? (
                        data.experience.map((exp, index) => (
                            <li key={index} className='p-4 rounded bg-[#fff9ea]'>
                                <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                                    {exp.years} Years
                                </span>
                                <p className='text-[16px] leading-6 font-medium text-textColor'>
                                    {exp.description}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className='text-[16px] text-textColor'>
                            No experience details available.
                        </p>
                    )}
                </ul>
            </div>
*/}
            {/* Available Timings Section */}
            <div className='mt-12'>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                    Available Timings
                </h3>
                <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
                    {data?.availableTimings?.length > 0 ? (
                        data.availableTimings.map((time, index) => (
                            <li key={index} className='p-4 rounded bg-[#f0f8ff]'>
                                <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                                    {time.day}
                                </span>
                                <p className='text-[16px] leading-6 font-medium text-textColor'>
                                    {time.startTime ? `${time.startTime} - ${time.endTime}` : 'Unavailable'}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className='text-[16px] text-textColor'>
                            No available timings set.
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default OrganiserAbout;
