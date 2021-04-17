import React from "react";

import { APP_STATES } from "../types";
import AppBody from "../components/AppBody";

const INITIAL_STATE = {
  appState: APP_STATES.API_KEY,
  apiKey: null,
  playbackId: null,
  streamKey: null,
  streamIsActive: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT_API_KEY":
      return {
        appState: APP_STATES.CREATE_BUTTON,
        apiKey: action.payload.apiKey,
      };
    case "CREATE_CLICKED":
      return {
        appState: APP_STATES.CREATING_STREAM,
      };
    case "STREAM_CREATED":
      return {
        appState: APP_STATES.WAITING_FOR_VIDEO,
        playbackId: action.payload.playbackId,
        streamKey: action.payload.streamKey,
      };
    case "VIDEO_STARTED":
      return {
        appState: APP_STATES.SHOW_VIDEO,
        streamIsActive: true,
      };
    case "VIDEO_STOPPED":
      return {
        appState: APP_STATES.WAITING_FOR_VIDEO,
        streamIsActive: false,
      };
    case "RESET_DEMO_CLICKED":
      return {
        ...INITIAL_STATE,
      };
    default:
      break;
  }
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return (
    <main className="container pb-12 h-screen">
      <header className="w-screen p-3 flex justify-between items-center">
        <a
          href="https://livepeer.com/docs/"
          target="_blank"
          rel="noopener, nofollow"
          className="logo flex flex-col w-2/5 lg:w-1/5"
        >
          <img src="/logo.svg"></img>
          <span className="font-bold">API Demo</span>
        </a>

        <button
          className="border p-2 h-1/2 rounded border-livepeer hover:bg-livepeer hover:text-white"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset Demo
        </button>
      </header>
      <AppBody state={state} dispatch={dispatch} />
      <footer className="fixed bottom-0 left-0 w-full h-12 bg-black text-white flex items-center justify-center">
        Made with&nbsp;
        <a href="https://livepeer.com/docs/" className="text-livepeer text-xl">
          Livepeer.com
        </a>
        &nbsp;API
      </footer>
    </main>
  );
}
