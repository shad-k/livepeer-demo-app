import React from "react";

import APIKeyForm from "./APIKeyForm";

import { APP_STATES } from "../types";

interface Props {
  state: any;
  setApiKey: (apiKey: string) => void;
}

const AppBody: React.FC<Props> = ({ state, setApiKey }) => {
  switch (state.appState) {
    case APP_STATES.API_KEY:
      return <APIKeyForm setApiKey={setApiKey} />;
    default:
      return null;
  }
};

export default AppBody;
