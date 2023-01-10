import Link from "next/link";
import { BrandGithub } from "tabler-icons-react";

const Hero: React.FC = () => (
  <div className="bg-[#FCFCFF] dark:bg-[#0A0F0D]">
    <div className="flex items-center max-w-screen-xl px-4 mx-auto h-screen lg:items-center lg:flex">
      <div className="max-w-5xl mx-auto text-center pb-32">
        <h1 className="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-blue-300 via-[#3772FF] to-blue-600">
          Open-source Formula 1 Telemetry Tool
        </h1>

        <p className="max-w-xl mx-auto mt-4 text-gray-700 dark:text-gray-300 sm:leading-relaxed sm:text-xl">
          Championship standings, Driver results through sessions <br />
          Global racepace, lap-by-lap raceplace <br />
          Tyre strategies and many more
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a href="https://github.com/milan-codes/formula-1-telemetry-frontend" target="_blank">
            <div className="cursor-pointer flex w-full sm:w-auto items-center justify-center px-4 py-3 text-gray-800 dark:text-gray-200 transition-colors duration-200 transform bg-transparent rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-80">
              <BrandGithub className="block h-6 w-6 pr-0 sm:pr-2 text-gray-800 dark:text-gray-200" />
              <div className="block">Contribute</div>
            </div>
          </a>
          <Link href="/telemetry">
            <div className="cursor-pointer flex w-full sm:w-auto items-center justify-center px-8 py-3 text-gray-50 transition-colors duration-200 transform bg-[#3772FF] rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-80">
              <div className="block">Get started</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
