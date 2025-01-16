import { use } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";

const DarkModeToggler = () => {
  const { isDark, toggleTheme } = use(ThemeContext)

  return (
    <button onClick={toggleTheme} className="text-2xl p-2 rounded-full cursor-pointer transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
      {isDark ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-natural" />
      )}
    </button>
  );
};

export default DarkModeToggler;