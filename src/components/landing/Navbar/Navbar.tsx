const Navbar: React.FC = () => (
  <header aria-label="Site Header" className="bg-gray-50">
    <div className="mx-auto max-w-screen-lg px-4">
      <div className="flex h-16 items-center justify-between">
        <div className="flex-1 md:flex md:items-center md:gap-12">
          <a
            href="/"
            className="inline-flex px-3 py-1 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900 text-blue-600 font-semibold"
          >
            <span className="sr-only">Logo</span>The Briefing Room 🏎️
          </a>
        </div>

        <nav aria-label="Site Nav" className="flex items-center gap-12">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#features">
                Features
              </a>
            </li>
            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#faq">
                FAQ
              </a>
            </li>
            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="/telemetry">
                Telemetry
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

export default Navbar;
