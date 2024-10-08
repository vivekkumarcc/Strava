import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import React, { useEffect, useState } from "react";
import { httpWithoutToken } from "../utils/http";
import "./activities.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { setUserAuth } from "../Redux/reducers/userSlice";

interface ActivitiesType {
  name: string;
  sportsType: string;
  distance: number;
  averageSpeed: number;
  maxSpeed: number;
  heartRate: boolean;
}

interface ResponseType {
  name: string;
  sport_type: string;
  distance: number;
  average_speed: number;
  max_speed: number;
  has_heartrate: boolean;
}

export default function Activities() {
  const token = useSelector((state: RootState) => state.user.token);
  const [activitiesData, setActivitiesData] = useState<ActivitiesType[] | null>(
    null
  );
  const navigate = useNavigate();
  const action = useDispatch();

  const handleResponse = (response: ResponseType[]) => {
    if (response && response.length > 0) {
      const processedArray = response.map((item) => {
        const {
          name,
          sport_type,
          distance,
          average_speed,
          max_speed,
          has_heartrate,
        } = item;
        return {
          name: name,
          sportsType: sport_type,
          distance: distance,
          averageSpeed: average_speed,
          maxSpeed: max_speed,
          heartRate: has_heartrate,
        };
      });

      setActivitiesData(processedArray);
    }
  };

  useEffect(() => {
    httpWithoutToken
      .get("/api/v3/athlete/activities", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((val) => {
        handleResponse(val.data);
      })
      .catch((err) => {
        window.alert("Network error please try again later");
        localStorage.removeItem("accessToken");
        action(setUserAuth({ authenticated: false, token: "" }));
        navigate("/authentication/landing");
      });
  }, []);

  const handleCreateButtonClick = () => {
    navigate("/user/create-activities");
  };

  return (
    <div className="activityMain-container">
      <div
        style={{
          justifyContent: "flex-end",
          display: "flex",
          padding: "25px",
        }}
      >
        <Button
          onClick={handleCreateButtonClick}
          sx={{ borderWidth: 3, fontSize: 16, fontWeight: 800 }}
          size="large"
          variant="outlined"
        >
          Create Activity
        </Button>
      </div>

      {activitiesData ? (
        <div className="activitiesContainer">
          {activitiesData.map((item, index) => (
            <div key={index} className="activityCard">
              <div>
                <h3>Name :</h3>
                <h3>Sports Type :</h3>
                <h3>Distance :</h3>
                <h3>Average speed :</h3>
                <h3>Max speed :</h3>
                <h3>Show Heart rate :</h3>
              </div>

              <div>
                <h3>{item.name}</h3>
                <h3>{item.sportsType}</h3>
                <h3>{item.distance}</h3>
                <h3>{item.averageSpeed}</h3>
                <h3>{item.maxSpeed}</h3>
                <h3>{String(item.heartRate)}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="emptyContainer">
          <p className="emptyText">No activities found. Create one now.</p>
        </div>
      )}
    </div>
  );
}
