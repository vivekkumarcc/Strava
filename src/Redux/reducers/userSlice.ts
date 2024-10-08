import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isUserAuthenticated: boolean;
  token: string;
}

const getIntialState = (): UserState => {
  const token = localStorage.getItem("accessToken") || "";
  return {
    isUserAuthenticated: !!token,
    token: token,
  };
};

export const userSlice = createSlice({
  name: "user",
  initialState: getIntialState,
  reducers: {
    setUserAuth: (
      state,
      action: PayloadAction<{
        authenticated: boolean;
        token: string;
      }>
    ) => {
      state.isUserAuthenticated = action.payload.authenticated;
      state.token = action.payload.token;
    },
  },
});

export const { setUserAuth } = userSlice.actions;

export default userSlice.reducer;
