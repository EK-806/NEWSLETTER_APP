import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const SinglePost = () => {
  const { mode, user, isAuthenticated } = useContext(Context);
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const getSinglePost = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/post/singlepost/${id}`,
          { withCredentials: true }
        );

        setPost(data.post);
      } catch (error) {
        setPost({});
        console.log(error);
      }
    };
    getSinglePost();
  }, [id]);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <article
      className={mode === "dark" ? "dark-bg singlePost" : "light-bg singlePost"}
    >
      {post && (
        <section className="container">
          <div className="category">{post.category}</div>
          <h1>{post.title}</h1>

          <div className="authors_section">
            <div className="author">
              <img
                src={post.authorProfilePicture}
                alt="author_profilePicture"
              />
              <p>{post.authorUserName}</p>
            </div>
          </div>

          {post.mainImage && (
            <img
              src={post.mainImage.url}
              alt="mainPostImg"
              className="mainImg"
            />
          )}

          <p className="intro-text">{post.intro}</p>

          <div className="paragraph-segment">
            <h3>{post.paragraphOneTitle}</h3>
            {post.paragraphOneImage && (
              <img src={post.paragraphOneImage.url} alt="paragraphOneImg" />
            )}
            <p>{post.paragraphOneDescription}</p>
          </div>

          <div className="paragraph-segment">
            <h3>{post.paragraphTwoTitle}</h3>
            {post.paragraphTwoImage && (
              <img src={post.paragraphTwoImage.url} alt="paragraphTwoImg" />
            )}
            <p>{post.paragraphTwoDescription}</p>
          </div>

          <div className="paragraph-segment">
            <h3>{post.paragraphThreeTitle}</h3>
            {post.paragraphThreeImage && (
              <img src={post.paragraphThreeImage.url} alt="paragraphThreeImg" />
            )}
            <p>{post.paragraphThreeDescription}</p>
          </div>

          <div className="post-dates">
            <small>
              <strong>Post Was Published On:</strong>{" "}
              {new Date(post.createdAt).toLocaleString()}
            </small>
            <br />
            {post.updatedAt && post.createdAt !== post.updatedAt && (
              <small>
                <strong>Changes Were Applied On:</strong>{" "}
                {new Date(post.updatedAt).toLocaleString()}
              </small>
            )}
          </div>
        </section>
      )}
    </article>
  );
};

export default SinglePost;