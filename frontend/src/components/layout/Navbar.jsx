import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { Context } from "../../main";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigateTo = useNavigate();
  const { mode, setMode, isAuthenticated, user, setIsAuthenticated } =
    useContext(Context);

  const location = useLocation();

  const handleNavbar = () => {
    setShow(!show);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigateTo(`/posts?search=${searchQuery}`);
      setShowSearch(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSearch();
    }
  };

  if (location.pathname === "/dashboard") {
    return null;
  }

  return (
    <section
      className={
        mode === "light" ? "header light-navbar" : "header dark-navbar"
      }
    >
      <nav>
        <div className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div
              className={`logo ${mode === "dark" ? "dark-logo" : "light-logo"}`}
            >
              <span>News</span>Letter
            </div>
          </Link>
        </div>

        <div className={show ? "links show" : "links"}>
          <ul>
            <li>
              <Link to="/" onClick={handleNavbar}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/posts" onClick={handleNavbar}>
                Posts
              </Link>
            </li>
            <li>
              <Link to="/authors" onClick={handleNavbar}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={handleNavbar}>
                About
              </Link>
            </li>
          </ul>

          <div className="btns">
            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className={
                mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"
              }
            >
              {mode === "light" ? (
                <CiLight className="light-icon" />
              ) : (
                <MdDarkMode className="dark-icon" />
              )}
            </button>

            {isAuthenticated && user.role === "Author" && (
              <Link
                to="/dashboard"
                onClick={handleNavbar}
                className="dashboard-btn"
              >
                Dashboard
              </Link>
            )}

            {!isAuthenticated ? (
              <Link to="/login" onClick={handleNavbar} className="login-btn">
                Login
              </Link>
            ) : (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
            <div className="search-icon">
              <BsSearch
                className="search-btn"
                onClick={() => setShowSearch(!showSearch)}
              />
            </div>

            {showSearch && (
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button onClick={handleSearch}>Search</button>
              </div>
            )}
          </div>
        </div>

        <RxHamburgerMenu className="hamburger" onClick={handleNavbar} />
      </nav>
    </section>
  );
};

export default Navbar;