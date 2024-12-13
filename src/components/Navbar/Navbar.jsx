import { Link, NavLink, useNavigate } from "react-router-dom";
import cart from "../../assets/cart.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";

export default function Navbar() {
  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const { numberOfCartItems } = useContext(CartContext);

  const [isNavBarVisible, setIsNavBarVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsNavBarVisible(true);
      } else {
        setIsNavBarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleNavBarVisibility() {
    setIsNavBarVisible(!isNavBarVisible);
  }

  function signOut() {
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1 md:p-4">
        <Link
          to="/"
          className="flex items-center md:space-x-3 rtl:space-x-reverse"
        >
          <img src={cart} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            FreshCart
          </span>
        </Link>
        <div className="flex md:order-2 md:space-x-0 rtl:space-x-reverse">
          <ul className="flex gap-1 md:gap-6 font-medium me-2 items-center">
            {token ? (
              <>
                <li
                  className="relative cursor-pointer me-4"
                  onClick={() => navigate("/cart")}
                >
                  <FaShoppingCart className="text-2xl text-[#323232]" />
                  <span className="absolute top-0 right-0  px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-green-500 rounded">
                    {numberOfCartItems || 0}
                  </span>
                </li>
                <li>
                  <button
                    type="button"
                    className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
                    onClick={signOut}
                  >
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="login">
                    <button
                      type="button"
                      className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
                    >
                      Login
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="register">
                    <button
                      type="button"
                      className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
                    >
                      Register
                    </button>
                  </Link>
                </li>
              </>
            )}
            {/* <ToggleThemeButton /> */}
          </ul>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden  focus:outline-none focus:ring-2  dark:text-gray-400 dark:hover:bg-gray-500 "
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={handleNavBarVisibility}
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
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between  w-full flex lg:w-auto order-2 lg:order-1">
          <ul
            className={`flex flex-col w-full p-4 lg:p-0 mt-4 font-medium text-xl border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-500 ${
              isNavBarVisible ? " " : "hidden"
            }`}
          >
            <li>
              <NavLink
                to=""
                className="block py-2 px-3 text-gray-900 rounded lg:bg-transparent   lg:p-0 lg:dark:text-white lg:dark:hover:text-green-500"
                aria-current="page"
                onClick={() => setIsNavBarVisible(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="cart"
                className="block py-2 px-3 text-gray-900 rounded  lg:hover:bg-transparent   lg:p-0 lg:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-500 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-500"
                onClick={() => setIsNavBarVisible(false)}
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                to="wishlist"
                className="block py-2 px-3 text-gray-900 rounded  lg:hover:bg-transparent   lg:p-0 lg:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-500 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-500"
                onClick={() => setIsNavBarVisible(false)}
              >
                Wishlist
              </NavLink>
            </li>
            <li>
              <NavLink
                to="products"
                className="block py-2 px-3 text-gray-900 rounded  lg:hover:bg-transparent   lg:p-0 lg:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-500 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-500"
                onClick={() => setIsNavBarVisible(false)}
              >
                Products
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// function ToggleThemeButton() {
//   const [isDark, setIsDark] = useState(
//     localStorage.theme === "dark" ||
//       (!("theme" in localStorage) &&
//         window.matchMedia("(prefers-color-scheme: dark)").matches)
//   );

//   useEffect(() => {
//     const html = document.querySelector("html");
//     if (isDark) {
//       html.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       html.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [isDark]);

//   function handleThemeClick() {
//     setIsDark(!isDark);
//   }

//   return (
//     <>
//       <button
//         onClick={handleThemeClick}
//         className="border p-2 rounded-lg border-gray-400"
//       >
//         {isDark ? <MdLightMode className="text-white" /> : <MdDarkMode />}
//       </button>
//     </>
//   );
// }
