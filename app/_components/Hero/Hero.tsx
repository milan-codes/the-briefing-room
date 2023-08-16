import Link from "next/link";
import { BrandGithub } from "tabler-icons-react";

const Hero: React.FC = () => (
  <section>
    <div className="mx-auto max-w-3xl px-4 py-28 text-center flex items-center">
      <div>
        <h1 className="text-gray-900 dark:text-gray-100 text-3xl font-extrabold sm:text-5xl">
          Analyze data from F1 sessions,
          <strong className="font-extrabold text-blue-700 sm:block">
            understand the sport better.
          </strong>
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mt-4 sm:text-xl sm:leading-relaxed">
          The Briefing Room is a free, open-source tool that allows you to view current and
          historical statistics, and analyse telemetry data from F1 sessions.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            className="block w-full rounded-md bg-blue-600 px-12 py-3 text-sm font-medium text-gray-50 shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
            href="/telemetry"
          >
            Get Started
          </Link>

          <a
            className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
            href="https://github.com/milan-codes/the-briefing-room"
          >
            <BrandGithub size={20} className="inline-block mr-2" />
            Contribute
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
