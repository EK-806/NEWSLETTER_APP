import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Context } from "../../main";

const UpdatePost = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [intro, setIntro] = useState("");
  const [paragraphOneTitle, setParagraphOneTitle] = useState("");
  const [paragraphOneImage, setParagraphOneImage] = useState("");
  const [paragraphOneDescription, setParagraphOneDescription] = useState("");
  const [paragraphTwoTitle, setParagraphTwoTitle] = useState("");
  const [paragraphTwoImage, setParagraphTwoImage] = useState("");
  const [paragraphTwoDescription, setParagraphTwoDescription] = useState("");
  const [paragraphThreeTitle, setParagraphThreeTitle] = useState("");
  const [paragraphThreeImage, setParagraphThreeImage] = useState("");
  const [paragraphThreeDescription, setParagraphThreeDescription] =
    useState("");
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [paragraphOneImagePreview, setParagraphOneImagePreview] = useState("");
  const [paragraphTwoImagePreview, setParagraphTwoImagePreview] = useState("");
  const [paragraphThreeImagePreview, setParagraphThreeImagePreview] =
    useState("");
  const [title, setTitle] = useState("");
  const [posted, setPosted] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/post/singlepost/${id}`,
          { withCredentials: true }
        );
        setTitle(data.post.title);
        setIntro(data.post.intro);
        setCategory(data.post.category);
        setPosted(data.post.posted);
        setMainImage(data.post.mainImage.url);
        setParagraphOneTitle(data.post.paragraphOneTitle);
        setParagraphOneDescription(data.post.paragraphOneDescription);
        data.post.paragraphOneImage &&
          setParagraphOneImage(data.post.paragraphOneImage.url);
        setParagraphTwoTitle(data.post.paragraphTwoTitle);
        setParagraphTwoDescription(data.post.paragraphTwoDescription);
        data.post.paragraphTwoImage &&
          setParagraphTwoImage(data.post.paragraphTwoImage.url);
        setParagraphThreeTitle(data.post.paragraphThreeTitle);
        setParagraphThreeDescription(data.post.paragraphThreeDescription);
        data.post.paragraphThreeImage &&
          setParagraphThreeImage(data.post.paragraphThreeImage.url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedPost = new FormData();
    updatedPost.append("title", title);
    updatedPost.append("intro", intro);
    updatedPost.append("category", category);
    console.log(posted);
    updatedPost.append("posted", posted);
    updatedPost.append("mainImage", mainImage);
    if (paragraphOneTitle && paragraphOneTitle.length !== 0) {
      updatedPost.append("paragraphOneTitle", paragraphOneTitle);
    } else {
      updatedPost.append("paragraphOneTitle", "");
    }
    if (paragraphOneDescription && paragraphOneDescription.length !== 0) {
      updatedPost.append("paragraphOneDescription", paragraphOneDescription);
    } else {
      updatedPost.append("paragraphOneDescription", "");
    }
    if (paragraphOneImage) {
      updatedPost.append("paragraphOneImage", paragraphOneImage);
    }
    if (paragraphTwoTitle && paragraphTwoTitle.length !== 0) {
      updatedPost.append("paragraphTwoTitle", paragraphTwoTitle);
    } else {
      updatedPost.append("paragraphTwoTitle", "");
    }
    if (paragraphTwoDescription && paragraphTwoDescription.length !== 0) {
      updatedPost.append("paragraphTwoDescription", paragraphTwoDescription);
    } else {
      updatedPost.append("paragraphTwoDescription", "");
    }
    if (paragraphTwoImage) {
      updatedPost.append("paragraphTwoImage", paragraphTwoImage);
    }
    if (paragraphThreeTitle && paragraphThreeTitle.length !== 0) {
      updatedPost.append("paragraphThreeTitle", paragraphThreeTitle);
    } else {
      updatedPost.append("paragraphThreeTitle", "");
    }
    if (paragraphThreeDescription && paragraphThreeDescription.length !== 0) {
      updatedPost.append(
        "paragraphThreeDescription",
        paragraphThreeDescription
      );
    } else {
      updatedPost.append("paragraphThreeDescription", "");
    }
    if (paragraphThreeImage) {
      updatedPost.append("paragraphThreeImage", paragraphThreeImage);
    }

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/post/update/${id}`,
        updatedPost,
        { withCredentials: true }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const mainImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImagePreview(reader.result);
      setMainImage(file);
    };
  };
  const paragraphOneImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParagraphOneImagePreview(reader.result);
      setParagraphOneImage(file);
    };
  };
  const paragraphTwoImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParagraphTwoImagePreview(reader.result);
      setParagraphTwoImage(file);
    };
  };
  const paragraphThreeImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParagraphThreeImagePreview(reader.result);
      setParagraphThreeImage(file);
    };
  };

  const { mode } = useContext(Context);

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="update-post">
        <h3>Update Post</h3>
        <form>
          <div className="category-box">
            <label>Select Post Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Post Category</option>
              <option value="Technology">Technology</option>
              <option value="Politics">Politics</option>
              <option value="Crime">Crime</option>
              <option value="Sports">Sports</option>
              <option value="Travel">Travel</option>
              <option value="Health">Health</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Write an updated intro title or leave blank!"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <img
              src={
                mainImagePreview
                  ? `${mainImagePreview}`
                  : mainImage
                  ? `${mainImage}`
                  : "imgMainPrev.png"
              }
              alt="mainImg"
            />
            <input
              type="file"
              onChange={mainImagePreviewHandler}
              style={{ border: "none" }}
            />
          </div>
          <textarea
            rows="25"
            className="intro"
            placeholder="Write an updated intro or leave blank!"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
          <div className="paragraph-segment">
            <input
              type="text"
              placeholder="Write an updated paragraph one title or leave blank!"
              value={
                paragraphOneTitle && paragraphOneTitle.length > 0
                  ? paragraphOneTitle
                  : ""
              }
              onChange={(e) => setParagraphOneTitle(e.target.value)}
            />
            <img
              src={
                paragraphOneImagePreview
                  ? `${paragraphOneImagePreview}`
                  : paragraphOneImage
                  ? `${paragraphOneImage}`
                  : "/imgParaOnePrev.png"
              }
              alt="segmentParagraphOneImg"
            />
            <input
              type="file"
              onChange={paragraphOneImagePreviewHandler}
              style={{ border: "none" }}
            />
            <textarea
              rows="10"
              placeholder="Write an updated paragraph one or leave blank!"
              value={
                paragraphOneDescription && paragraphOneDescription.length > 0
                  ? paragraphOneDescription
                  : ""
              }
              onChange={(e) => setParagraphOneDescription(e.target.value)}
            />
          </div>
          <div className="paragraph-segment">
            <input
              type="text"
              placeholder="Write an updated paragraph two title or leave blank!"
              value={
                paragraphTwoTitle && paragraphTwoTitle.length > 0
                  ? paragraphTwoTitle
                  : ""
              }
              onChange={(e) => setParagraphTwoTitle(e.target.value)}
            />
            <img
              src={
                paragraphTwoImagePreview
                  ? `${paragraphTwoImagePreview}`
                  : paragraphTwoImage
                  ? `${paragraphTwoImage}`
                  : "/imgParaTwoPrev.png"
              }
              alt="segmentParagraphTwoImg"
            />
            <input
              type="file"
              onChange={paragraphTwoImagePreviewHandler}
              style={{ border: "none" }}
            />
            <textarea
              rows="10"
              placeholder="Write an updated paragraph two or leave blank!"
              value={
                paragraphTwoDescription && paragraphTwoDescription.length > 0
                  ? paragraphTwoDescription
                  : ""
              }
              onChange={(e) => setParagraphTwoDescription(e.target.value)}
            />
          </div>
          <div className="paragraph-segment">
            <input
              type="text"
              placeholder="Write an updated paragraph three title or leave blank!"
              value={
                paragraphThreeTitle && paragraphThreeTitle.length > 0
                  ? paragraphThreeTitle
                  : ""
              }
              onChange={(e) => setParagraphThreeTitle(e.target.value)}
            />
            <img
              src={
                paragraphThreeImagePreview
                  ? `${paragraphThreeImagePreview}`
                  : paragraphThreeImage
                  ? `${paragraphThreeImage}`
                  : "/imgParaThreePrev.png"
              }
              alt="segmentParagraphThreeImg"
            />
            <input
              type="file"
              onChange={paragraphThreeImagePreviewHandler}
              style={{ border: "none" }}
            />
            <textarea
              rows="10"
              placeholder="Write an updated paragraph three or leave blank!"
              value={
                paragraphThreeDescription &&
                paragraphThreeDescription.length > 0
                  ? paragraphThreeDescription
                  : ""
              }
              onChange={(e) => setParagraphThreeDescription(e.target.value)}
            />
          </div>
          <div className="post-box">
            <label>Are you ready to update your post?</label>
            <select
              value={posted === null ? "" : posted}
              onChange={(e) => setPosted(e.target.value === "true")}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
        </form>
      </section>
    </article>
  );
};

export default UpdatePost;