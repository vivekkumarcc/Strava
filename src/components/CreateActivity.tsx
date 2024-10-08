import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { httpWithoutToken } from "../utils/http";
import { setUserAuth } from "../Redux/reducers/userSlice";

export default function CreateActivity() {
  const token = useSelector((state: RootState) => state.user.token);
  const navigate = useNavigate();
  const action = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const textStyle = {
    fontSize: 25,
    mt: 2,
    color: "#161d6f",
  };

  const goBack = () => {
    navigate("/user/activities");
  };

  const yupSchema = Yup.object({
    name: Yup.string().required("Required"),
    type: Yup.string().required("Required").oneOf(["Run", "Ride"]),
    startDate: Yup.string().required("Required"),
    elapsedTime: Yup.number().required("Required"),
    description: Yup.string().required("Required"),
    distance: Yup.number().required("Required"),
    trainer: Yup.number().required("Required"),
    commute: Yup.number().required("Required"),
  });

  const handleFormSubmission = (values: FormikValues) => {
    httpWithoutToken
      .post(
        "/api/v3/activities",
        {
          name: values.name,
          sport_type: values.type,
          start_date_local: values.startDate,
          elapsed_time: values.elapsedTime,
          description: values.description,
          distance: values.distance,
          trainer: values.trainer,
          commute: values.commute,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((val) => {
        if (val.data?.athlete) {
          navigate("/user/activities");
        }
      })
      .catch((err) => {
        window.alert("Network error please try again later");
        localStorage.removeItem("accessToken");
        action(setUserAuth({ authenticated: false, token: "" }));
        navigate("/authentication/landing");
      });
  };
  return (
    <div
      style={{
        background: "#f6f6f6",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          overflow: "auto",
          p: 4,
          border: "2px solid #161d6f",
          borderRadius: "10px",
          m: 10,
        }}
      >
        <Formik
          initialValues={{
            name: "",
            type: "",
            startDate: 0,
            elapsedTime: 0,
            description: "",
            distance: 0,
            trainer: 1,
            commute: 1,
          }}
          validationSchema={yupSchema}
          onSubmit={(values) => {
            handleFormSubmission(values);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Box>
                <Typography sx={{ color: "#161d6f" }} variant="h2">
                  Create New Activity.
                </Typography>
              </Box>

              <>
                <InputLabel sx={textStyle} htmlFor="name">
                  Name
                </InputLabel>
                <TextField
                  fullWidth
                  error={
                    formik.touched?.name && formik.errors.name ? true : false
                  }
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                  helperText={
                    formik.touched?.name && formik.errors?.name
                      ? formik.errors?.name
                      : null
                  }
                  placeholder="Enter"
                  variant="outlined"
                />

                <InputLabel sx={textStyle} htmlFor="type">
                  Type
                </InputLabel>
                <TextField
                  fullWidth
                  error={
                    formik.touched?.type && formik.errors?.type ? true : false
                  }
                  id="type"
                  type="text"
                  {...formik.getFieldProps("type")}
                  helperText={
                    formik.touched?.type && formik.errors?.type
                      ? formik.errors?.type
                      : null
                  }
                  select
                  placeholder="Please Enter"
                  variant="outlined"
                >
                  {["Run", "Ride"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <InputLabel sx={textStyle} htmlFor="startDate">
                  Start Date
                </InputLabel>
                <TextField
                  fullWidth
                  error={
                    formik.touched?.startDate && formik.errors.startDate
                      ? true
                      : false
                  }
                  id="startDate"
                  type="date"
                  {...formik.getFieldProps("startDate")}
                  helperText={
                    formik.touched?.startDate && formik.errors?.startDate
                      ? formik.errors?.startDate
                      : null
                  }
                  placeholder="Enter"
                  variant="outlined"
                />

                <InputLabel sx={textStyle} htmlFor="elapsedTime">
                  Elapsed Time(in seconds)
                </InputLabel>
                <TextField
                  fullWidth
                  error={
                    formik.touched?.elapsedTime && formik.errors.elapsedTime
                      ? true
                      : false
                  }
                  id="elapsedTime"
                  type="text"
                  {...formik.getFieldProps("elapsedTime")}
                  helperText={
                    formik.touched?.elapsedTime && formik.errors?.elapsedTime
                      ? formik.errors?.elapsedTime
                      : null
                  }
                  placeholder="Enter"
                  variant="outlined"
                />

                <InputLabel sx={textStyle} htmlFor="description">
                  Description
                </InputLabel>
                <TextField
                  fullWidth
                  error={
                    formik.touched?.description && formik.errors.description
                      ? true
                      : false
                  }
                  id="description"
                  type="text"
                  {...formik.getFieldProps("description")}
                  helperText={
                    formik.touched?.description && formik.errors?.description
                      ? formik.errors?.description
                      : null
                  }
                  placeholder="Enter"
                  variant="outlined"
                />

                <InputLabel sx={textStyle} htmlFor="distance">
                  Distance(in meters)
                </InputLabel>
                <TextField
                  fullWidth
                  error={
                    formik.touched?.distance && formik.errors.distance
                      ? true
                      : false
                  }
                  id="distance"
                  type="text"
                  {...formik.getFieldProps("distance")}
                  helperText={
                    formik.touched?.distance && formik.errors?.distance
                      ? formik.errors?.distance
                      : null
                  }
                  placeholder="Enter"
                  variant="outlined"
                />

                <InputLabel sx={textStyle} htmlFor="trainer">
                  Trainer
                </InputLabel>
                <TextField
                  fullWidth
                  error={
                    formik.touched?.trainer && formik.errors.trainer
                      ? true
                      : false
                  }
                  id="trainer"
                  type="text"
                  {...formik.getFieldProps("trainer")}
                  helperText={
                    formik.touched?.trainer && formik.errors?.trainer
                      ? formik.errors?.trainer
                      : null
                  }
                  placeholder="Enter"
                  variant="outlined"
                />

                <InputLabel sx={textStyle} htmlFor="commute">
                  Commute
                </InputLabel>
                <TextField
                  fullWidth
                  error={
                    formik.touched?.commute && formik.errors.commute
                      ? true
                      : false
                  }
                  id="commute"
                  type="text"
                  {...formik.getFieldProps("commute")}
                  helperText={
                    formik.touched?.commute && formik.errors?.commute
                      ? formik.errors?.commute
                      : null
                  }
                  placeholder="Enter"
                  variant="outlined"
                />

                <Box
                  sx={{
                    mt: "4vh",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onClick={goBack}
                    sx={{ mr: "1.5vh" }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  {isLoading ? (
                    <Box>
                      <CircularProgress size={25} />
                    </Box>
                  ) : (
                    <Button variant="contained" type="submit">
                      Create New Form
                    </Button>
                  )}
                </Box>
              </>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
}
