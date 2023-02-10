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
      <Footer
        description="Get access to the latest telemetry data from the Formula 1 world championship"
        groups={[
          {
            groupTitle: "About",
            links: [
              { label: "Features", href: "#features" },
              { label: "FAQ", href: "#faq" },
            ],
          },
          {
            groupTitle: "Project",
            links: [
              {
                label: "Contribute",
                href: "https://github.com/milan-codes/formula-1-telemetry-frontend",
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Home;
