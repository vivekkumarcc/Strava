import "./landingPage.css";
import React from "react";

const { REACT_APP_CLIENT_ID } = process.env;
const redirectUrl = "http://localhost:3000/RedirectedLoader";
const scope = "activity:read_all,activity:write";

export default function LandingPage() {
  const openStravaLoginPage = () => {
    window.location.href = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}&approval_prompt=force&scope=${scope}`;
  };

  return (
    <div className="container">
      <button onClick={openStravaLoginPage} className="loginButton">
        Login with Strava
      </button>
    </div>
  );
}
