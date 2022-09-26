import { PresentationChartLineIcon } from "@heroicons/react/outline";

const NavbarButton: React.FC = () => (
  <button className="flex items-center justify-center px-4 py-2 text-gray-50 transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-80">
    <PresentationChartLineIcon className="block lg:hidden h-6 w-6 pr-0 sm:pr-2 text-gray-50" />
    <PresentationChartLineIcon className="hidden lg:block h-6 w-6 pr-0 sm:pr-2 text-gray-50" />
    <div className="hidden lg:block">Start analyzing</div>
  </button>
);

export default NavbarButton;
