import React from 'react';
import aboutImg from '../../assets/images/about.png';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-8 lg:gap-0 lg:flex-row">
          {/* About Img - Hidden on Mobile */}
          <div className="hidden lg:block relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="" />
          </div>

          {/* About Content */}
          <div className="w-full lg:w-[670px] order-1 lg:order-2 flex flex-col items-center lg:items-start">
  <h2 className="heading items-center text-center lg:text-left">
    Proud To Be the <b className="text-blue-700">First</b> & <b className="text-blue-700">Best</b>
  </h2>
  <p className="text__para text-center lg:text-left">
    Welcome to EveHub, your ultimate gateway to a world of curated events and unforgettable experiences! At EveHub, we believe that every moment is an opportunity to create memories, connect with others, and discover new passions. Our platform is designed to seamlessly connect event organizers with individuals seeking vibrant and diverse experiences.
  </p>
  <p className="text__para mt-4 lg:mt-0 text-center lg:text-left">
    EveHub is on a mission to foster community engagement by simplifying the process of discovering and participating in events. We aim to empower event organizers to reach a broader audience while providing individuals with a one-stop destination for finding events that align with their interests.
  </p>
  <Link to="/">
    <button className="btn mt-4">Learn More</button>
  </Link>
</div>

        </div>
      </div>
    </section>
  );
}

export default About;
