import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { Context } from "../../main";

const Posts = () => {
  const { mode } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const authorUserName = queryParams.get("author");
  const searchQuery = queryParams.get("search");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let url = "http://localhost:4000/api/v1/post/all";

        if (category) {
          url = `http://localhost:4000/api/v1/post/search/category/${category}`;
        } else if (authorUserName) {
          url = `http://localhost:4000/api/v1/post/search/author/${authorUserName}`;
        } else if (searchQuery) {
          url = `http://localhost:4000/api/v1/post/search/title/${searchQuery}`;
        }

        const { data } = await axios.get(url);
        setPosts(data.posts || data.allPosts);
      } catch (error) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, authorUserName, searchQuery]);

  if (loading)
    return (
      <div
        className={
          mode === "dark" ? "loader-container dark-bg" : "loader-container"
        }
      >
        <BeatLoader color="gray" size={30} />
      </div>
    );

  if (error) {
    return (
      <p
        className={
          mode === "dark"
            ? "failed-fetch-message dark-bg"
            : "failed-fetch-message"
        }
      >
        {error}
      </p>
    );
  }

  const sortedPosts = posts?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 3);
  };

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <h2>
        {category
          ? `Posts Related To Category: ${
              category.charAt(0).toUpperCase() + category.slice(1)
            }`
          : authorUserName
          ? `Posts by Author: ${
              authorUserName.charAt(0).toUpperCase() + authorUserName.slice(1)
            }`
          : searchQuery
          ? `Search Results for Title: ${searchQuery}`
          : "All Posts"}
      </h2>
      <section className="posts">
        <div className="container">
          {sortedPosts && sortedPosts.length > 0 ? (
            sortedPosts.slice(0, visibleCount).map((post) => (
              <Link to={`/post/${post._id}`} className="card" key={post._id}>
                <img
                  src={post.mainImage.url}
                  alt="post"
                  className="post-image"
                />
                <span className="category">{post.category}</span>
                <h4>{post.title}</h4>
                <div className="authors_section">
                  <div className="author">
                    <img
                      src={post.authorProfilePicture}
                      alt="author_profilePicture"
                      className="author-profile-image"
                    />
                    <p>{post.authorUserName}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-posts-message">
              <p>No posts were found.</p>
            </div>
          )}
        </div>

        {sortedPosts && visibleCount < sortedPosts.length && (
          <button className="show-more" onClick={handleShowMore}>
            Show More
          </button>
        )}
      </section>
    </article>
  );
};

export default Posts;