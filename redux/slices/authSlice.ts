import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthType = {
  token: string;
  username: string;
};

const initialState: AuthType = {
  token: "",
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<AuthType["token"]>) {
      state.token = action.payload;
    },
    setUsername(state, action: PayloadAction<AuthType["username"]>) {
      state.username = action.payload;
    },
  },
});

export const { setToken, setUsername } = authSlice.actions;

export default authSlice.reducer;
