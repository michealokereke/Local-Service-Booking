import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  system: false,
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    toggleUiMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem("LSBUiMode", JSON.stringify(state));
      }
    },
    setUiMode: () => {},
  },
});

export const { toggleUiMode, setUiMode } = uiSlice.actions;
export default uiSlice.reducer;
