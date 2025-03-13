import { createSlice } from "@reduxjs/toolkit";

type AudioStateTypes = {
  now_playing: string;
};

const initialState: AudioStateTypes = {
  now_playing: "",
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {},
});

export const {} = audioSlice.actions;

export default audioSlice.reducer;
