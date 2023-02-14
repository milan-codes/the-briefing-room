const Footer: React.FC = () => (
  <footer aria-label="Site footer">
    <div className="mx-auto max-w-screen-lg px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-center text-blue-600 font-extrabold sm:justify-start">
            The Briefing Room 🏎️
          </div>

          <p className="text-gray-900 dark:text-gray-100 mx-auto mt-6 max-w-md text-center leading-relaxed sm:mx-0 sm:max-w-xs sm:text-left">
            Analyse data from any F1 session starting from the 2021 season.
          </p>

          <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
            <li>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 dark:text-gray-300 transition hover:text-gray-700/75 dark:hover:text-gray-300/75"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">🗺️</p>

            <nav aria-label="Footer Services Nav" className="mt-8">
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-500 dark:text-gray-400 transition hover:text-gray-500/75 dark:hover:text-gray-400/75"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 dark:text-gray-400 transition hover:text-gray-500/75 dark:hover:text-gray-400/75"
                    href="/telemetry"
                  >
                    Telemetry
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 dark:text-gray-400 transition hover:text-gray-500/75 dark:hover:text-gray-400/75"
                    href="/archive"
                  >
                    Archive
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">About</p>

            <nav aria-label="Footer About Nav" className="mt-8">
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-500 dark:text-gray-400 transition hover:text-gray-500/75 dark:hover:text-gray-400/75"
                    href="#features"
                  >
                    Features
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 dark:text-gray-400 transition hover:text-gray-500/75 dark:hover:text-gray-400/75"
                    href="#faq"
                  >
                    F.A.Q.
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">Project</p>

            <nav aria-label="Footer Services Nav" className="mt-8">
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-500 dark:text-gray-400 transition hover:text-gray-500/75 dark:hover:text-gray-400/75"
                    href="https://github.com/milan-codes/formula-1-telemetry-frontend"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 dark:text-gray-400 transition hover:text-gray-500/75 dark:hover:text-gray-400/75"
                    href="https://github.com/milan-codes/formula-1-telemetry-frontend"
                  >
                    Contribute
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 dark:text-gray-400 transition hover:text-gray-500/75 dark:hover:text-gray-400/75"
                    href="https://github.com/milan-codes/formula-1-telemetry-frontend"
                  >
                    Bugs
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 dark:border-gray-100 pt-6">
        <div className="text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Made by Milán Herke, a fellow F1 fan. <br />
            The creator of this website is in no way, shape or form linked to FORMULA 1, Liberty
            Media, the FIA or any other organization. This website was created only for fun, and
            educational purposes and it does not generate any revenue. All rights belong to their
            respective owners. Data provided by{" "}
            <a href="https://theoehrly.github.io/Fast-F1/" target="_blank" className="underline">
              FastF1
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
