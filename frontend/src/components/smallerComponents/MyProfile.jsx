import React, { useContext } from "react";
import { Context } from "../../main";

const MyProfile = () => {
  const { user } = useContext(Context);

  return (
    <section className="profile">
      <div className="profilePicture">
        <img
          src={
            user.profilePicture
              ? user.profilePicture.url
              : "/imgProfPicPrev.jpg"
          }
          alt="profilePicture"
        />
      </div>
      <div className="user-details">
        <p>
          User Name: <span>{user.userName}</span>
        </p>
        <p>
          Email: <span>{user.email}</span>
        </p>
        <p>
          Phone: <span>{user.phone}</span>
        </p>
        <p>
          Role: <span>{user.role}</span>
        </p>
      </div>
    </section>
  );
};

export default MyProfile;