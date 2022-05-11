import React from "react";
import Head from "next/head";
import Game from "../src/components/Game";
import { useMoralis } from "react-moralis";
import { useState } from "react";

export default function Home() {
  const { authenticate, isAuthenticated, logout, account } = useMoralis();
  return (
    <div className="App">
      <Head>
        <title>Snake3.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isAuthenticated ? (
        <Game />
      ) : (
        <>
          <div className="loader-center">
            <div className="loader"></div>
          </div>
          <div style={{textAlign:"center",fontFamily:"monospace"}}>Please Join Me with Metamask to Play this game and select Mumbai Matic as your network </div>
        </>
      )}
    </div>
  );
}
