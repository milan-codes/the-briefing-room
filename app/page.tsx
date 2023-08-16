import { NextPage } from "next";
import Hero from "./components/Hero";
import Image from "next/image";
import Features from "./components/Features";
import Faq from "./components/Faq";
import telemetryDemo from "../public/images/readme/telemetry-demo.png";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-screen-lg">
        <Image src={telemetryDemo} alt="App demo image" />
      </div>
      <Features />
      <Faq />
    </>
  );
};

export default Home;
