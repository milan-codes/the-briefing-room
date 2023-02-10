import Link from "next/link";
import { BrandGithub } from "tabler-icons-react";

const Hero: React.FC = () => (
  <section className="bg-gray-50">
    <div className="mx-auto max-w-3xl px-4 py-32 text-center flex h-[90vh] items-center">
      <div>
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Analyze data from F1 sessions,
          <strong className="font-extrabold text-blue-700 sm:block">
            increase your understanding.
          </strong>
        </h1>

        <p className="mt-4 sm:text-xl sm:leading-relaxed">
          The Briefing Room is a free, open-source tool that allows you to analyze telemetry data
          from F1 sessions.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="block w-full rounded-md bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
            href="/telemetry"
          >
            Get Started
          </a>

          <a
            className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
            href="/about"
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
