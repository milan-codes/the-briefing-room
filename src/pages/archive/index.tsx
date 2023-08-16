import { NextPage } from "next";
import ArchiveList from "../../components/archive/ArchiveList/ArchiveList";
import Footer from "../../../app/components/Footer";
import Navbar from "../../components/landing/Navbar";

const Archive: NextPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <ArchiveList />
      <Footer />
    </div>
  );
};

export default Archive;
