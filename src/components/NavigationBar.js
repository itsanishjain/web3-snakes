import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/snakelogo.png";
import Button from "./Button";
import { useState, useEffect } from "react";

// wallet
import { connectors } from "../connectors";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";


export default function NavigationBar() {
  // const { authenticate, isAuthenticated, logout, account } = useMoralis();

  const [authLoading, setAuthLoading] = useState(false);

  const { library, chainId, account, activate, deactivate, active } = useWeb3React();


  // const walletLogin = async () => {
  //   setAuthLoading(true);
  //   await authenticate();
  //   setAuthLoading(false);
  // };

  useEffect(() => {
    const provider = localStorage.getItem("provider");
    console.log(provider, ">>>>>>>>>>")
    activate(connectors[provider], () => {
      console.log("error");
    });
  }, [activate]);



  const connectMetaMask = async () => {
    let isCancelled = false;
    await activate(connectors.injected, () => {
      toast("Connection Rejected");
      isCancelled = true;
    });

    if (!isCancelled) {
      setProvider("injected");
      toast("Connected Successfully");
    }
  }

  // Set MM/walletConnect provider in localStorage
  const setProvider = (type) => { window.localStorage.setItem("provider", type) };

  // Unset MM/walletConnect provider in localStorage
  const refreshState = () => { window.localStorage.setItem("provider", undefined) };

  const disconnect = () => {
    refreshState();
    deactivate();
  };




  const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  return (
    <header>
      <Link href="/" passHref>
        <div className="logo">
          <Image
            alt="snake logo"
            src={logo}
            className="logo"
            width={128}
            height={128}
          />
        </div>
      </Link>
      <nav>
        <ul className="nav_links">
          <li>
            <Link href="/players" passHref>
              <a className="">Players</a>
            </Link>
          </li>
          <li>
            <Link href="https://github.com/itsanishjain" passHref>
              <a className="">About</a>
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/itsanishjain" passHref>
              <a>contact</a>
            </Link>
          </li>
        </ul>
      </nav>

      {!account ? (
        <div className="nav_links">
          {!authLoading ? (
            <button onClick={connectMetaMask} className="primary-btn">
              Join Me Now
            </button>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) : (
        <>
          <h4>Welcome {truncateAddress(account)}</h4>
          <Button action={disconnect} text="logout" />
        </>
      )}
    </header>
  );
}
