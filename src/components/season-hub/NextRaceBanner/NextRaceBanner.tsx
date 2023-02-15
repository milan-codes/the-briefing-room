interface NextRaceBannerProps {
  grandPrixName: string;
}

const NextRaceBanner: React.FC<NextRaceBannerProps> = ({ grandPrixName }) => (
  <div className="mx-auto max-w-screen-lg px-4 py-8">
    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Season Hub</h1>
    <p className="text-gray-600 dark:text-gray-400">
      All the information you need about the {new Date().getFullYear()} Formula 1 season
    </p>
    <div className="mt-12 flex flex-col items-center gap-4 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-900  p-6 shadow-lg sm:flex-row sm:justify-between">
      <strong className="text-xl text-white sm:text-xl">Next up: Saudi Arabian Grand Prix</strong>

      <a
        className="inline-flex items-center rounded-full border border-white bg-white px-8 py-3 text-indigo-600 hover:bg-sky-50 focus:outline-none focus:ring active:bg-white/90"
        href="/"
      >
        <span className="text-sm font-medium"> See preview </span>

        <svg
          className="ml-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </div>
  </div>
);

export default NextRaceBanner;
