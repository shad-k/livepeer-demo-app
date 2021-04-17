import React from "react";
import { APP_STATES } from "../types";

interface Props {
  state: any;
  dispatch: React.Dispatch<{ type: string; payload: any }>;
}

const AppBody: React.FC<Props> = ({ state, dispatch }) => {
  switch (state.appState) {
    default:
      return null;
  }
};

export default AppBody;
