import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "User" });
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    axios
      .get(`http://localhost:3000/userProfile/${userId}`)
      .then((res) => setUserDetails(res.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />

      <div className="profile-tabs">
        <button className="tab active">Overview</button>
        <button className="tab" onClick={() => navigate("/repo")}>
          Starred Repositories
        </button>
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          setCurrentUser(null);
          window.location.href = "/auth";
        }}
        id="logout"
      >
        Logout
      </button>

      <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image"></div>

          <h3>{userDetails.username}</h3>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>10 Followers</p>
            <p>3 Following</p>
          </div>
        </div>

        <div className="heat-map-section">
          <HeatMapProfile />
        </div>
      </div>
    </>
  );
};

export default Profile;
