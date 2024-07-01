import { useState } from "react";
import { NavLink } from "react-router-dom";

function MenuBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "font-bold" : "font-thin")}
        >
          <img src="/ao-logo6.png" alt="logo" className="w-auto h-20" />
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
          onClick={toggleMenu}
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
        <div
          className={`w-full text-center md:block md:w-auto gap-2 ${
            isMenuOpen ? "" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 text-white">
            <li>
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  isActive ? "font-bold" : "font-thin"
                }
              >
                Jobs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/todo"
                className={({ isActive }) =>
                  isActive ? "font-bold" : "font-thin"
                }
              >
                Todo
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuBar;
