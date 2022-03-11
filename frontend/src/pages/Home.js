import React, { useEffect } from "react";
import Header from "../components/header/Header";

import { useDispatch } from "react-redux";
import posts from "../state/actions/posts";
import useDarkMode from "../hooks/useDarkMode";

function Home() {
  const [colorTheme, setTheme] = useDarkMode();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(posts());
  }, []);

  return (
    <div className="bg-[#DAE0E6] h-screen dark:bg-black">
      <Header />
      {colorTheme === "light" ? (
        <h1
          className="text-blue-500 dark:text-white"
          onClick={() => setTheme(colorTheme)}
        >
          set dark
        </h1>
      ) : (
        <h1
          className="text-blue-500 dark:text-white"
          onClick={() => setTheme(colorTheme)}
        >
          set light
        </h1>
      )}
    </div>
  );
}

export default Home;
