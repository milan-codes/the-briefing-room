import { NextPage } from "next";
import Hero from "../src/components/landing/Hero";
import Image from "next/image";
import Features from "../src/components/landing/Features";
import Faq from "../src/components/landing/Faq";
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
