import React from "react";
import rbg from "../assets/images/rbg.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";


const Home = () => {
  return (
    <>
    <section className="hero__section  2xl:h-800px">
      {/* ----------------hero section----------*/}
      <div className="container flex justify-center pt-24">
        {/*---------Hero content--------*/}
        <div className="left w-[50%] mt-200px">
          {/*----------hero content----------*/}
          <div className="lg:w-[570px]">
            <h1 className="text-[46px] leading-[46px] text-headingColor font-[800] md:text-[60px]">
              <h1>EnLight Your</h1>
              <h1 className="pt-5">Moments With just</h1>
              <h1 className="pt-5">
                A <span className="text-primaryColor ">Plan</span>
              </h1>
            </h1>
            <p className="text__para">
              Get the best event organizer & <br /> Enlight the memories with
              full of joy
            </p>
            <br />
            <br />
            <button className="btn">Book Appointments</button>
          </div>
          {/*---------Hero Counter------*/}
          <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
            <div>
              <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                200+
              </h2>
              <p>Organisers</p>
            </div>
            <div>
              <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                400+
              </h2>
              <p>Events</p>
            </div>
            <div>
              <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                600+
              </h2>
              <p>Customers</p>
            </div>
          </div>
        </div>
        {/*---------Hero img--------*/}
        <div className="rigth w-[50%] flex flex-col items-center justify-end  ">
          <img src={rbg} alt="Heroright" className="w-full max-w-[500px]" />
        </div>
      </div>
      </section>
      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center"> 
            Providing The Best Event Service
            </h2>
            <p className="text__para text-center">
              We have passionate professionals who understand how to make your special day truly unforgetable
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon01} alt=""/>
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">Find a Organiser</h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Get Organiser who are experienced event planners will work closely with you from the initial consultation
                </p>
                <Link to='/organisers' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] 
                mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">

                <BsArrowRight className="group-hover:text-white w-6 h-5"/>
                
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon02} alt=""/>
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">Find By Location</h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Get Organiser who are experienced event planners will work closely with you from the initial consultation
                </p>
                <Link to='/organisers' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] 
                mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">

                <BsArrowRight className="group-hover:text-white w-6 h-5"/>
                
                </Link>
              </div>
            </div>
                        <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon03} alt=""/>
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">Book Appointment</h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Get Organiser who are experienced event planners will work closely with you from the initial consultation
                </p>
                <Link to='/organisers' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] 
                mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">

                <BsArrowRight className="group-hover:text-white w-6 h-5"/>
                
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
