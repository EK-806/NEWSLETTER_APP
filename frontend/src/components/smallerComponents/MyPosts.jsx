import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/post/myposts",
        { withCredentials: true }
      );
      setMyPosts(data.posts);
    };
    fetchMyPosts();
  }, []);

  const deletePostHandler = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/v1/post/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyPosts((previewPosts) =>
          previewPosts.filter((post) => post._id !== id)
        );
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <section className="my-posts">
        {myPosts && myPosts.length > 0
          ? myPosts.map((element) => {
              return (
                <div className="author-post-card" key={element._id}>
                  {element.mainImage && element.mainImage && (
                    <img src={element.mainImage.url} alt="postImg" />
                  )}
                  <span className="category">{element.category}</span>
                  <h4>{element.title}</h4>
                  <div className="btn-wrapper">
                    <Link
                      to={`/post/update/${element._id}`}
                      className="update-btn"
                    >
                      Update
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => deletePostHandler(element._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          : "You have not published any post!"}
      </section>
    </>
  );
};

export default MyPosts;