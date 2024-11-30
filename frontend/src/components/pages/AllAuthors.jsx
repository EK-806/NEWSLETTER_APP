import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const AllAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const { mode } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/authors",
          { withCredentials: true }
        );
        setAuthors(data.authors);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleAuthorClick = (authorUserName) => {
    navigate(`/posts?author=${authorUserName}`);
  };

  return (
    <article
      className={
        mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"
      }
    >
      <h2>All Authors</h2>
      <div className="container">
        {authors && authors.length > 0 ? (
          authors.map((author) => (
            <div className="card" key={author._id}>
              <div
                className="author-link"
                onClick={() => handleAuthorClick(author.userName)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={author.profilePicture.url}
                  alt={`${author.userName}'s profile`}
                />
                <h3>{author.userName}</h3>
                <p>{author.role}</p>
              </div>
            </div>
          ))
        ) : authors.length === 0 ? (
          <p>No Authors Found</p>
        ) : (
          <div
            className="loader-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <BeatLoader color="gray" size={50} />
          </div>
        )}
      </div>
    </article>
  );
};

export default AllAuthors;