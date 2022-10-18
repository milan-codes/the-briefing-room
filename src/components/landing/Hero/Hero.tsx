import { BrandGithub } from "tabler-icons-react";

const Hero: React.FC = () => (
  <div className="bg-gray-50 dark:bg-black">
    <div className="flex items-center max-w-screen-xl px-4 mx-auto h-screen lg:items-center lg:flex">
      <div className="max-w-5xl mx-auto text-center pb-32">
        <h1 className="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r dark:from-gray-300 dark:via-red-400 dark:to-red-600">
          Open-source Formula 1 telemetry tool
        </h1>

        <p className="max-w-xl mx-auto mt-4 text-gray-800 dark:text-gray-200 sm:leading-relaxed sm:text-xl">
          Championship standings, Driver results through sessions <br />
          Global racepace, lap-by-lap raceplace <br />
          Tyre strategies and many more
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button className="flex w-full sm:w-auto items-center justify-center px-4 py-3 text-gray-800 dark:text-gray-200 transition-colors duration-200 transform bg-transparent rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-80">
            <BrandGithub className="block h-6 w-6 pr-0 sm:pr-2 text-gray-800 dark:text-gray-200" />
            <div className="block">Contribute</div>
          </button>
          <button className="flex w-full sm:w-auto items-center justify-center px-8 py-3 text-gray-50 transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-80">
            <div className="block">Get started</div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
