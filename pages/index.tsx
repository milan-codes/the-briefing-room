import Navbar from "../components/Navbar";
import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <div>
      <Navbar
        links={[
          { name: "Features", href: "#features" },
          { name: "F.A.Q.", href: "#faq" },
        ]}
      />
    </div>
  );
};

export default Home;
