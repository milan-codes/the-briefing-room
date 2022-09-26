import Navbar from "../components/Navbar";
import type { NextPage } from "next";
import Hero from "../components/Hero";
import Features from "../components/Features";
import { CogIcon, DatabaseIcon, UserIcon } from "@heroicons/react/outline";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
import { useAppSelector } from "../app/hooks";
import { selectEventQuery } from "../features/events/eventQuerySlice";

const Home: NextPage = () => {
  const event = useAppSelector(selectEventQuery);

  return (
    <div>
      <Navbar
        links={[
          { name: "Features", href: "#features" },
          { name: "F.A.Q.", href: "#faq" },
        ]}
      />
      <Hero />
      <div id="features">
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
      <div id="faq">
        <Faq
          items={[
            {
              title: "Where do we get the data from?",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
              title: "How accurate is the data?",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
              title: "Do you collect personal information about me?",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
              title: "Is this unofficial software?",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
              title: "How can I support the project?",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
          ]}
        />
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
              { label: "Contribute", href: "/contribute" },
              { label: "Changelog", href: "/changelog" },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Home;
