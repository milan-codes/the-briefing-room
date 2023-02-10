const Navbar: React.FC = () => (
  <header aria-label="Site Header" className="bg-gray-50">
    <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex-1 md:flex md:items-center md:gap-12">
          <a className="block text-teal-600" href="/">
            <span className="sr-only">Home</span>
            🏎️
          </a>
        </div>

        <div className="md:flex md:items-center md:gap-12">
          <nav aria-label="Site Nav" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                  Features
                </a>
              </li>

              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                href="/"
              >
                Try telemetry
              </a>
            </div>

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                🏎️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
