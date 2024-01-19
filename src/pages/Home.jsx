import React from "react";
import rbg from "../assets/images/rbg.png";

const Home = () => {
  return (
    <>
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
        <div className="rigth w-[50%] flex flex-col items-center pt-6 ">
          <img src={rbg} alt="Heroright" className="w-full max-w-[800px]" />
        </div>
      </div>
    </>
  );
};

export default Home;
