import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreatePost = () => {
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

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("intro", intro);
    formData.append("mainImage", mainImage);
    formData.append("category", category);
    formData.append("posted", posted);
    if (paragraphOneTitle.length > 0) {
      formData.append("paragraphOneTitle", paragraphOneTitle);
    }
    if (paragraphOneDescription.length > 0) {
      formData.append("paragraphOneDescription", paragraphOneDescription);
    }
    if (paragraphOneImage) {
      formData.append("paragraphOneImage", paragraphOneImage);
    }
    if (paragraphTwoTitle.length > 0) {
      formData.append("paragraphTwoTitle", paragraphTwoTitle);
    }
    if (paragraphTwoDescription.length > 0) {
      formData.append("paragraphTwoDescription", paragraphTwoDescription);
    }
    if (paragraphTwoImage) {
      formData.append("paragraphTwoImage", paragraphTwoImage);
    }
    if (paragraphThreeTitle.length > 0) {
      formData.append("paragraphThreeTitle", paragraphThreeTitle);
    }
    if (paragraphThreeDescription.length > 0) {
      formData.append("paragraphThreeDescription", paragraphThreeDescription);
    }
    if (paragraphThreeImage) {
      formData.append("paragraphThreeImage", paragraphThreeImage);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/post/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTitle("");
      setIntro("");
      setCategory("");
      setMainImage("");
      setMainImagePreview("");
      setParagraphOneTitle("");
      setParagraphOneDescription("");
      setParagraphOneImage("");
      setParagraphOneImagePreview("");
      setParagraphTwoTitle("");
      setParagraphTwoDescription("");
      setParagraphTwoImage("");
      setParagraphTwoImagePreview("");
      setParagraphThreeTitle("");
      setParagraphThreeDescription("");
      setParagraphThreeImage("");
      setParagraphThreeImagePreview("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="create-post">
      <h3>Create Post</h3>
      <div className="container">
        <form onSubmit={handlePost}>
          <div className="category-box">
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
            placeholder="Main Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              src={
                mainImagePreview ? `${mainImagePreview}` : "/imgMainPrev.png"
              }
              alt="mainImg"
              className="mainImg"
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
            placeholder="POST INTRO..... (Must contain at least 250 characters!)"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
          <div className="paragraph-segment">
            <input
              type="text"
              placeholder="Paragraph One Title"
              value={paragraphOneTitle}
              onChange={(e) => setParagraphOneTitle(e.target.value)}
            />
            <img
              src={
                paragraphOneImagePreview
                  ? `${paragraphOneImagePreview}`
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
              placeholder="Write your first paragraph here!"
              value={paragraphOneDescription}
              onChange={(e) => setParagraphOneDescription(e.target.value)}
            />
          </div>
          <div className="paragraph-segment">
            <input
              type="text"
              placeholder="Paragraph Two Title"
              value={paragraphTwoTitle}
              onChange={(e) => setParagraphTwoTitle(e.target.value)}
            />
            <img
              src={
                paragraphTwoImagePreview
                  ? `${paragraphTwoImagePreview}`
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
              placeholder="Write your second paragraph here!"
              value={paragraphTwoDescription}
              onChange={(e) => setParagraphTwoDescription(e.target.value)}
            />
          </div>
          <div className="paragraph-segment">
            <input
              type="text"
              placeholder="Paragraph Three Title"
              value={paragraphThreeTitle}
              onChange={(e) => setParagraphThreeTitle(e.target.value)}
            />
            <img
              src={
                paragraphThreeImagePreview
                  ? `${paragraphThreeImagePreview}`
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
              placeholder="Write your third paragraph here!"
              value={paragraphThreeDescription}
              onChange={(e) => setParagraphThreeDescription(e.target.value)}
            />
          </div>
          <div className="post-box">
            <label>Are you ready to publish your post</label>
            <select
              value={posted}
              onChange={(e) => setPosted(e.target.value === "true")}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <button className="create-btn" type="submit">
            Publish Post
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;