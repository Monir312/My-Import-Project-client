import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ChangeMode() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="p-4 flex justify-end bg-base-200">
      <button className="btn btn-primary" onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </header>
  );
}
