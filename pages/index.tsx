import Navbar from "../components/Navbar";
import type { NextPage } from "next";
import Hero from "../components/Hero";
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
    </div>
  );
};

export default Home;
