import React, { useState, useContext } from "react";
import { Context } from "../../main";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const LatestPosts = ({ heading, newClass }) => {
  const { posts } = useContext(Context);

  const [visibleCount, setVisibleCount] = useState(6);

  const sortedPosts = posts?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 3);
  };

  return (
    <section className={newClass ? "dashboard-posts posts" : "posts"}>
      <h3>{heading}</h3>
      <div className="container">
        {sortedPosts && sortedPosts.length > 0 ? (
          sortedPosts.slice(0, visibleCount).map((post) => (
            <Link to={`/post/${post._id}`} className="card" key={post._id}>
              <img src={post.mainImage.url} alt="post" className="post-image" />
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
          <div className="loader-container">
            <BeatLoader color="gray" size={30} />
          </div>
        )}
      </div>

      {sortedPosts && visibleCount < sortedPosts.length && (
        <button className="show-more" onClick={handleShowMore}>
          Show More
        </button>
      )}
    </section>
  );
};

export default LatestPosts;