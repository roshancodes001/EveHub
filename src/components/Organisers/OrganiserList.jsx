import React from 'react';
import {organisers} from '../../assets/data/organisers';
import OrganiserCard from './OrganiserCard';

const OrganiserList = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px]'>
      {organisers.map((organiser) => (
        <OrganiserCard key={organiser.id} organiser={organiser} />
      ))}
    </div>
  );
};

export default OrganiserList;
