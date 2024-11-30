import React, { useEffect, useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const PopularAuthors = () => {
  const [authors, setAuthors] = useState([]);
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
    <section className="popularAuthors">
      <h3>Popular Authors</h3>
      <div className="container">
        {authors && authors.length > 0 ? (
          authors.slice(0, 4).map((author) => (
            <div className="card" key={author._id}>
              <div
                className="author-link"
                onClick={() => handleAuthorClick(author.userName)}
                style={{ cursor: "pointer" }}
              >
                <img src={author.profilePicture.url} alt="author" />
                <p>{author.userName}</p>
                <p>{author.role}</p>
              </div>
            </div>
          ))
        ) : (
          <BeatLoader color="gray" size={30} />
        )}
      </div>
    </section>
  );
};

export default PopularAuthors;