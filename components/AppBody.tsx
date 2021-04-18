import React from "react";

import APIKeyForm from "./APIKeyForm";

import { APP_STATES } from "../types";

interface Props {
  state: any;
  setApiKey: (apiKey: string) => void;
  createStream: () => void;
}

const AppBody: React.FC<Props> = ({ state, setApiKey, createStream }) => {
  switch (state.appState) {
    case APP_STATES.API_KEY:
      return <APIKeyForm setApiKey={setApiKey} />;
    case APP_STATES.CREATE_BUTTON:
      return (
        <div className="w-full h-3/5 flex items-center justify-center">
          <button
            className="text-2xl border border-black rounded p-2"
            onClick={createStream}
          >
            Create Stream
          </button>
        </div>
      );
    case APP_STATES.CREATING_STREAM:
      return (
        <div className="w-full h-3/5 flex flex-col items-center justify-center">
          <div className="animate-spin w-8 h-8 rounded-full border-2 border-livepeer border-r-0 border-b-0 mb-8"></div>
          Creating stream...
        </div>
      );
    default:
      return null;
  }
};

export default AppBody;
