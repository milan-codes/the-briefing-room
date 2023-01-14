import { PresentationChartLineIcon } from "@heroicons/react/outline";
import Link from "next/link";

const NavbarButton: React.FC = () => (
  <Link href="/telemetry">
    <div className="cursor-pointer flex items-center justify-center px-8 py-3 text-gray-50 transition-colors duration-200 transform bg-[#3772FF] rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-80">
      <PresentationChartLineIcon className="block lg:hidden h-6 w-6 pr-0 sm:pr-2 text-gray-50" />
      <PresentationChartLineIcon className="hidden lg:block h-6 w-6 pr-0 sm:pr-2 text-gray-50" />
      <div className="hidden lg:block">Start analyzing</div>
    </div>
  </Link>
);

export default NavbarButton;
