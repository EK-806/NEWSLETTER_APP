import React, { useContext, useState } from "react";
import LatestPosts from "../smallerComponents/LatestPosts";
import HighlightSection from "../smallerComponents/HighlightSection";
import TrendingPosts from "../smallerComponents/TrendingPosts";
import PopularAuthors from "../smallerComponents/PopularAuthors";
import { Context } from "../../main";

const Home = () => {
  const { mode, posts } = useContext(Context);
  const filteredPosts = posts.slice(0, 6);
  return (
    <>
      <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
        <HighlightSection />
        <TrendingPosts />
        <LatestPosts heading={"Latest Posts"} posts={filteredPosts} />
        <PopularAuthors />
      </article>
    </>
  );
};

export default Home;