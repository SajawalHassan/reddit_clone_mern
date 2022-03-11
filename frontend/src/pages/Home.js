import React, { useEffect } from "react";
import Header from "../components/header/Header";
import posts from "../state/actions/posts";

import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(posts());
  }, []);

  return (
    <div className="bg-[#DAE0E6] h-screen dark:bg-black">
      <Header />
    </div>
  );
}

export default Home;
