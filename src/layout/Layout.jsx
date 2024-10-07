import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";
import GenerativeAIComponent from "../components/Chatbot/ChatBot";

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
