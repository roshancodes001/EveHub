import React from 'react'
import starIcon from '../../assets/images/Star.png';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const OrganiserCard = ({organiser}) => {
    const {name,avgRating,totalRating,photo,specialization,totalEvents,address}=organiser
  return (
    <div className='p-3 lg:p-5'>
        <div>
            <img src={photo} className='w-full' alt="Organizer Photo"/>
        </div>
        <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5'>
            {name}
        </h2>
        <div className='mt-2 lg:mt-4 flex items-center justify-between'>
          <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text=[16px] lg:leading-7 font-semibold rounded '>
            {specialization}
          </span>

        </div>

    </div>
  )
}

export default OrganiserCard