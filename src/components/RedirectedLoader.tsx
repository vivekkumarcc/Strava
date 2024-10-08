import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { setUserAuth } from "../Redux/reducers/userSlice";
import {
  retirieveAuthToken,
  httpWithoutToken,
  isAllPermissionAvailable,
} from "../utils/http";
import { useNavigate } from "react-router-dom";

interface ResponseType {
  data: { access_token: string };
}

export default function RedirectedLoader() {
  const styles = {
    div: {
      background: "#f6f6f6",
      height: "100vh",
      width: "100%",
      margin: "0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "#161d6f",
      fontWeight: "bold",
      fontSize: "40px",
    },
  };

  const action = useDispatch();

  const navigate = useNavigate();
  const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET_KEY } = process.env;

  useEffect(() => {
    if (window.location.search) {
      if (window.location.search.includes("error")) {
        window.alert("Authentications Failed \nPlease try again.");
        localStorage.removeItem("accessToken");
        action(setUserAuth({ authenticated: false, token: "" }));
        navigate("/authentication/landing");
      } else {
        const permission = isAllPermissionAvailable(window.location.search);
        if (permission) {
          const token = retirieveAuthToken(window.location.search);
          httpWithoutToken
            .post(
              `/oauth/token?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET_KEY}&code=${token}&grant_type=authorization_code`
            )
            .then((response: ResponseType) => {
              const {
                data: { access_token },
              } = response;
              localStorage.setItem("accessToken", access_token);
              action(setUserAuth({ authenticated: true, token: access_token }));
              navigate("/user/activities");
            })
            .catch((err) => {
              window.alert("Network error please try again later");
              localStorage.removeItem("accessToken");
              action(setUserAuth({ authenticated: false, token: "" }));
              navigate("/authentication/landing");
            });
        } else {
          window.alert(
            "Permission required \nPlease provide all read and edit permissions."
          );
          localStorage.removeItem("accessToken");
          action(setUserAuth({ authenticated: false, token: "" }));
          navigate("/authentication/landing");
        }
      }
    }
  }, []);

  return (
    <div style={styles.div}>
      <p style={styles.text}>Loading ...</p>
    </div>
  );
}
