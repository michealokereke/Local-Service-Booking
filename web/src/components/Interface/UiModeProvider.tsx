"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUiMode } from "../../store/slices/uiSlice";
import { RootState } from "../../store/store";

const UiModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const UIState = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    const getUiMode = () => {
      const stringifyUiMode = localStorage.getItem("LSBUiMode");
      if (stringifyUiMode) {
        const uiMode = JSON.parse(stringifyUiMode);

        if (uiMode.mode === "light" && UIState.mode !== "light") {
          dispatch(toggleUiMode());
        }
        if (uiMode.mode === "dark" && UIState.mode !== "dark") {
          dispatch(toggleUiMode());
        }
      }
    };

    getUiMode();
  }, [dispatch, UIState]);

  useEffect(() => {
    if (UIState.mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [UIState]);

  return <div>{children}</div>;
};

export default UiModeProvider;
