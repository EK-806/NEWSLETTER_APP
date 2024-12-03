import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] = useState("");

  const changeProfilePictureHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfilePicturePreview(reader.result);
      setProfilePicture(file);
    };
  };

  const { mode, isAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("profilePicture", profilePicture);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setProfilePicture("");
      setProfilePicturePreview("");
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <div>
            <input
              type="text"
              placeholder="UserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className="ProfilePicturePlaceHolder">
              <img
                src={
                  profilePicturePreview
                    ? `${profilePicturePreview}`
                    : "/imgProfPicPrev.png"
                }
                alt="profilePicture"
              />
            </div>
            <input
              type="file"
              onChange={changeProfilePictureHandler}
              style={{ border: "none" }}
            />
          </div>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Select Role">Select Role</option>
            <option value="Reader">Reader</option>
            <option value="Author">Author</option>
          </select>
          <button className="submit-btn" type="submit">
            Register
          </button>
          <p>
            Are you already Registered? <Link to={"/login"}>Login Now</Link>
          </p>
        </form>
      </section>
    </article>
  );
};

export default Register;
  );
};

export default Register;
