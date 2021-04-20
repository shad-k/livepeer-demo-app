import React from "react";
import Hls from "hls.js";

import APIKeyForm from "./APIKeyForm";

import { APP_STATES } from "../utils/types";

interface Props {
  state: any;
  setApiKey: (apiKey: string) => void;
  createStream: () => void;
}

const copyTextToClipboard = (text: string) => {
  navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    if (result.state == "granted" || result.state == "prompt") {
      navigator.clipboard.writeText(text);
    }
  });
};

const AppBody: React.FC<Props> = ({ state, setApiKey, createStream }) => {
  const { playbackId, streamIsActive, streamKey } = state;
  React.useEffect(() => {
    let hls;
    if (streamIsActive && playbackId) {
      const video = document.getElementById("video");
      const videoSrc = `https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`;
      if (Hls.isSupported()) {
        hls = new Hls();
        // bind them together
        hls.attachMedia(video as HTMLVideoElement);
        // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          console.log("video and hls.js are now bound together !");
          hls.loadSource(videoSrc);
          hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            console.log(
              "manifest loaded, found " + data.levels.length + " quality level"
            );
            (video as HTMLVideoElement).play();
          });
        });
        hls.on(Hls.Events.ERROR, function (event, data) {
          var errorType = data.type;
          var errorDetails = data.details;
          var errorFatal = data.fatal;
          if (errorFatal) {
            switch (errorType) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                // try to recover network error
                console.log("fatal network error encountered, try to recover");
                setTimeout(() => {
                  hls.loadSource(videoSrc);
                }, 10000);
                // hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log("fatal media error encountered, try to recover");
                hls.recoverMediaError();
                break;
              default:
                // cannot recover
                hls.destroy();
                break;
            }
          }
          console.log(errorType, errorDetails, errorFatal);
        });
      } else if (
        (video as HTMLVideoElement).canPlayType("application/vnd.apple.mpegurl")
      ) {
        (video as HTMLVideoElement).src = videoSrc;
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [streamIsActive]);
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
    case APP_STATES.WAITING_FOR_VIDEO:
    case APP_STATES.SHOW_VIDEO:
      return (
        <div className="container w-full h-3/5 lg:h-4/5 flex flex-col items-center justify-center">
          <div className="relative bg-black h-3/5 w-full xl:w-3/5 overflow-hidden">
            <video id="video" className="h-full w-full" controls />
            <div className="bg-white rounded-xl flex items-center justify-center absolute right-2 top-2 p-1 text-xs">
              <div
                className={`animate-pulse ${
                  streamIsActive ? "bg-green-700" : "bg-yellow-600"
                } h-2 w-2 mr-2 rounded-full`}
              ></div>
              {streamIsActive ? "Live" : "Paused"}
            </div>
          </div>

          <div className="w-11/12 lg:w-full xl:w-3/5 border border-dashed p-2 m-4 flex flex-col text-sm">
            <div className="flex items-center justify-between mt-2 break-all">
              <span>
                Playback URL:
                <br />
                https://cdn.livepeer.com/hls/{playbackId}/index.m3u8
              </span>
              <button
                onClick={() =>
                  copyTextToClipboard(
                    `https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`
                  )
                }
                className="border ml-1 p-1 rounded text-sm break-normal"
              >
                Copy
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 break-all">
              <span>
                Injest URL:
                <br />
                rtmp://rtmp.livepeer.com/live/{streamKey}
              </span>
              <button
                onClick={() =>
                  copyTextToClipboard(
                    `rtmp://rtmp.livepeer.com/live/${streamKey}`
                  )
                }
                className="border ml-1 p-1 rounded text-sm break-normal"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default AppBody;
