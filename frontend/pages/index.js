import React from "react";
import Head from "next/head";
import Game from "../src/components/Game";

export default function Home() {
  return (
    <div className="App">
      <Head>
        <title>Snake3.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Game />
    </div>
  );
}
