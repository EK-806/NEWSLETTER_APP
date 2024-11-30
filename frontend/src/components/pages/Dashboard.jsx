import React, { useContext, useState } from "react";
import MyPosts from "../smallerComponents/MyPosts";
import Sidebar from "../layout/SideBar";
import MyProfile from "../smallerComponents/MyProfile";
import CreatePost from "../smallerComponents/CreatePost";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [component, setComponent] = useState("MyPosts");
  const { mode, isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <Sidebar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Post" ? (
        <CreatePost />
      ) : (
        <MyPosts />
      )}
    </section>
  );
};

export default Dashboard;