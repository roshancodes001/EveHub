import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";
import ChatBot from "../components/ChatBot/ChatBot"; // Adjust path if needed
import GenerativeAIComponent from "../components/ChatBot/ChatBot";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
      {/* Add the ChatBot here so it appears on all pages */}
      <GenerativeAIComponent />
    </>
  );
};

export default Layout;
