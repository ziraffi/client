import PropTypes from "prop-types";
import LoginBtn from "./LoginBtn";
import GetInTouch from "./GetInTouch";

function Navbar({ barHeight, isDrawerOpen, toggleDrawer, scrollProgress }) {
  const drawerTopPosition = scrollProgress === 1 ? barHeight : 72;
  // console.log(drawerTopPosition);
  
  return (
    <div className="w-1/3 md:w-3/6 order-[1] md:order-[2] md:px-10 flex md:justify-center">
      <button
        onClick={toggleDrawer}
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="drawer-navigation"
        aria-expanded={isDrawerOpen}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden"
          style={{ top: `${barHeight}px` }}
          onClick={toggleDrawer}
        ></div>
      )}

      <div
        id="drawer-navigation"
        className={`fixed left-0 z-50 w-64 bg-white dark:bg-gray-800 md:hidden transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          top: `${drawerTopPosition}px`,
          height: `calc(100vh - ${drawerTopPosition}px)`,
          overflowY: "auto",
        }}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <div className="p-4 flex flex-col h-full">
          <h5
            id="drawer-navigation-label"
            className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
          >
            Menu
          </h5>
          <button
            type="button"
            onClick={toggleDrawer}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <nav className="py-4 flex-grow">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div className="mt-auto flex flex-col items-center gap-4">
            <LoginBtn />
            <GetInTouch />
          </div>
        </div>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:block">
        <nav className="float-right">
          <ul className="flex flex-row space-x-8">
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  barHeight: PropTypes.number.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  scrollProgress: PropTypes.number.isRequired,
};

export default Navbar;
