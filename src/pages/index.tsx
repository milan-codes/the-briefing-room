import Navbar from "../components/landing/Navbar";
import type { NextPage } from "next";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import { CogIcon, DatabaseIcon, UserIcon } from "@heroicons/react/outline";
import Faq from "../components/landing/Faq";
import Footer from "../components/landing/Footer";
import { useAppSelector } from "../app/hooks";
import { selectEventQuery } from "../features/events/eventQuerySlice";

const Home: NextPage = () => {
  const event = useAppSelector(selectEventQuery);

  return (
    <div>
      <Navbar />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="faq">
        <Faq />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
