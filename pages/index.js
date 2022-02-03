import React from "react";
import Head from "next/head";
import Board from "../src/components/Board";

export default function Home() {
  return (
    <div className="App">
      <Head>
        <title>Roodly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="cards">
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
      </div>
    </div>
  );
}
