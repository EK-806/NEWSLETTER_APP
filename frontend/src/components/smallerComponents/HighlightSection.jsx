import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../main";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const sortByNewest = (array) => {
  return array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const HighlightSection = () => {
  const { posts } = useContext(Context);

  const sortedPosts = posts && posts.length > 0 ? sortByNewest(posts) : [];

  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    if (sortedPosts.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentPostIndex(
          (prevIndex) => (prevIndex + 1) % sortedPosts.length
        );
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [sortedPosts.length]);

  return (
    <section className="highlights">
      {sortedPosts.length > 0 ? (
        <>
          <Link
            to={`/post/${sortedPosts[currentPostIndex]._id}`}
            className="card"
            key={sortedPosts[currentPostIndex]._id}
          >
            <img
              src={sortedPosts[currentPostIndex].mainImage.url}
              alt="post"
              className="postImg"
            />
            <div className="category">
              {sortedPosts[currentPostIndex].category}
            </div>
            <h1>{sortedPosts[currentPostIndex].title}</h1>
            <div className="authors_section">
              <div className="author">
                <img
                  src={sortedPosts[currentPostIndex].authorProfilePicture}
                  alt="author_profilePicture"
                />
                <p>{sortedPosts[currentPostIndex].authorUserName}</p>
              </div>
            </div>
          </Link>

          <Link
            to={`/post/${
              sortedPosts[(currentPostIndex + 1) % sortedPosts.length]._id
            }`}
            className="card"
            key={sortedPosts[(currentPostIndex + 1) % sortedPosts.length]._id}
          >
            <img
              src={
                sortedPosts[(currentPostIndex + 1) % sortedPosts.length]
                  .mainImage.url
              }
              alt="post"
              className="postImg"
            />
            <div className="category">
              {
                sortedPosts[(currentPostIndex + 1) % sortedPosts.length]
                  .category
              }
            </div>
            <h1>
              {sortedPosts[(currentPostIndex + 1) % sortedPosts.length].title}
            </h1>
            <div className="authors_section">
              <div className="author">
                <img
                  src={
                    sortedPosts[(currentPostIndex + 1) % sortedPosts.length]
                      .authorProfilePicture
                  }
                  alt="author_profilePicture"
                />
                <p>
                  {
                    sortedPosts[(currentPostIndex + 1) % sortedPosts.length]
                      .authorUserName
                  }
                </p>
              </div>
            </div>
          </Link>
        </>
      ) : (
        <BeatLoader color="gray" size={30} />
      )}
    </section>
  );
};

export default HighlightSection;