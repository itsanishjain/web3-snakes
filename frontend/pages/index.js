import React from "react";
import Head from "next/head";
import Board from "../src/components/Board";
import Button from "../src/components/Button";

export default function Home() {
  return (
    <div className="App">
      <Head>
        <title>Snake3.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Board />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button />
      </div>
    </div>
  );
}
