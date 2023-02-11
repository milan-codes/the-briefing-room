import Navbar from "../components/landing/Navbar";
import type { NextPage } from "next";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import { CogIcon, DatabaseIcon, UserIcon } from "@heroicons/react/outline";
import Faq from "../components/landing/Faq";
import Footer from "../components/landing/Footer";
import { useAppSelector } from "../app/hooks";
import { selectEventQuery } from "../features/events/eventQuerySlice";
import Image from "next/image";
import telemetryDemo from "../../public/telemetrydemo.png";

const Home: NextPage = () => {
  const event = useAppSelector(selectEventQuery);

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Hero />
      <div className="mx-auto max-w-screen-lg bg-gray-50 ">
        <Image src={telemetryDemo} />
      </div>
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
