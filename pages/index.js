import Head from "next/head";
import Game from "../src/components/Game";
import { useEffect } from "react";

import { useWeb3React } from "@web3-react/core";
import { connectors } from "../src/connectors";


export default function Home() {
  // const { authenticate, isAuthenticated, logout, account } = useMoralis();

  const { library, chainId, account, activate, deactivate, active } = useWeb3React();


  useEffect(() => {
    const provider = localStorage.getItem("provider");
    activate(connectors[provider], (error) => {
      console.log("error", error);
    });
  }, [activate]);




  return (
    <div className="App">
      <Head>
        <title>Snake3.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {account ? (
        <Game />
      ) : (
        <>
          <div className="loader-center">
            <div className="loader"></div>
          </div>
          <div style={{ textAlign: "center", fontFamily: "monospace" }}>Please Join Me with Metamask to Play this game and select Mumbai Matic as your network </div>
        </>
      )}
    </div>
  );
}
