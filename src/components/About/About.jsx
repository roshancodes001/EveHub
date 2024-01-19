

import React from 'react'
import aboutImg from '../../assets/images/about.png';
import { Link } from 'react-router-dom';

const About = () => {
  return <section>
    <div className="container">
        <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
        {/*--------About Img--------- */}
        <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
            <img src={aboutImg} alt="" />
            
        </div>

        {/*-------About Content-------*/}
        <div className='w-full lg:w-[670px] order-1 lg:order-2'>
        <h2 className='heading items-center'>Proud To Be the <b className='text-blue-700'>First</b> & <b className='text-blue-700'>Best</b></h2> 
        <p className='text__para'>
        Welcome to EveHub, your ultimate gateway to a world of curated events and unforgettable experiences! At EveHub, we believe that every moment is an opportunity to create memories, connect with others, and discover new passions. Our platform is designed to seamlessly connect event organizers with individuals seeking vibrant and diverse experiences.
        </p> 

        <p className="text__para mt-[20px]">
        EveHub is on a mission to foster community engagement by simplifying the process of discovering and participating in events. We aim to empower event organizers to reach a broader audience while providing individuals with a one-stop destination for finding events that align with their interests.


        </p>
        <Link to='/'><button className="btn">Learn More</button></Link>
        </div>


        </div>
    </div>

  </section>
}

export default About