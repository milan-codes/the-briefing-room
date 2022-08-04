import Navbar from "../components/Navbar";
import type { NextPage } from "next";
import Hero from "../components/Hero";
import Features from "../components/Features";
import { CogIcon, DatabaseIcon, UserIcon } from "@heroicons/react/outline";
const Home: NextPage = () => {
  return (
    <div>
      <Navbar
        links={[
          { name: "Features", href: "#features" },
          { name: "F.A.Q.", href: "#faq" },
        ]}
      />
      <Hero />
      <Features
        features={[
          {
            title: "See championship standings",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
            icon: <DatabaseIcon style={{ width: 30, height: 30 }} />,
          },
          {
            title: "Analyize quali & race data",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            icon: <CogIcon style={{ width: 30, height: 30 }} />,
          },
          {
            title: "See driver stats",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            icon: <UserIcon style={{ width: 30, height: 30 }} />,
          },
        ]}
      />
    </div>
  );
};

export default Home;
