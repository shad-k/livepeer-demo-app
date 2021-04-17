import React from "react";

export default function App() {
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

        <button className="border p-2 h-1/2 rounded border-livepeer hover:bg-livepeer hover:text-white">
          Reset Demo
        </button>
      </header>
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
