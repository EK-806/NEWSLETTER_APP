import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiFillFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Context } from "../../main";

const Footer = () => {
  const { isAuthenticated, user, mode } = useContext(Context);
  const isDashboard = useLocation();
  const navigate = useNavigate();

  const categories = [
    "Technology",
    "Politics",
    "Crime",
    "Sports",
    "Travel",
    "Health",
  ];

  const handleCategoryClick = (category) => {
    navigate(`/posts?category=${category.toLowerCase()}`);
  };

  return (
    <footer
      className={
        isDashboard.pathname === "/dashboard"
          ? "hideFooter"
          : mode === "light"
          ? "light-footer"
          : "dark-footer"
      }
    >
      <div className="container">
        <div className="about">
          <h3>About</h3>
          <p>
            We deliver the latest news and insights across various topics, from
            Technology to Lifestyle. Our mission is to keep you informed and
            inspired with engaging, well-researched content.
          </p>
          <p>
            <span>Email:</span> contact@fikt.edu.mk
          </p>
          <p>
            <span>Phone:</span> +389 77 871 376
          </p>
        </div>
        <div className="footer_nav">
          <h3>Site Shortcuts</h3>
          <ul>
            <Link to={"/"}>Home</Link>
            <Link to={"/posts"}>Posts</Link>
            <Link to={"/about"}>About</Link>

            {isAuthenticated && user?.role === "Author" && (
              <Link to={"/dashboard"}>Dashboard</Link>
            )}
          </ul>
        </div>
        <div className="categories">
          <h3>Categories</h3>
          <ul>
            {categories.map((category) => (
              <li key={category} onClick={() => handleCategoryClick(category)}>
                <span>{category}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="updates_subscription">
          <div>
            <h3>Weekly Updates</h3>
            <p>Get updates of popular posts & articles via email today!</p>
          </div>
          <div>
            <input type="text" placeholder={`Your Email`} />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="container">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div
            className={`logo ${mode === "dark" ? "dark-logo" : "light-logo"}`}
          >
            <span>News</span>Letter
          </div>
        </Link>
        <div className="links">
          <Link to={"/"} target="_blank">
            <AiFillInstagram />
          </Link>
          <Link to={"/"} target="_blank">
            <AiFillFacebook />
          </Link>
          <Link to={"/"} target="_blank">
            <AiFillYoutube />
          </Link>
          <Link to={"/"} target="_blank">
            <AiOutlineTwitter />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;