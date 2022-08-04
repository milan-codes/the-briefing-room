import { BeakerIcon } from "@heroicons/react/outline";

const NavbarButton: React.FC = () => (
  <button className="flex items-center justify-center px-4 py-2 text-gray-50 transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-80">
    <BeakerIcon className="block lg:hidden h-6 w-6 pr-0 sm:pr-2 text-gray-50" />
    <BeakerIcon className="hidden lg:block h-6 w-6 pr-0 sm:pr-2 text-gray-50" />
    <div className="hidden lg:block">Join Beta</div>
  </button>
);

export default NavbarButton;
