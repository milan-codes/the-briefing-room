import Hero from "./_components/Hero";
import Image from "next/image";
import Features from "./_components/Features";
import Faq from "./_components/Faq";
import telemetryDemo from "../public/images/readme/telemetry-demo.png";

const Home = () => {
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
