import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/snakelogo.png";
import { useMoralis } from "react-moralis";
import Button from "./Button";
import { useState, useEffect } from "react";

export default function NavigationBar() {
  const { authenticate, isAuthenticated, logout, account } = useMoralis();

  const [authLoading, setAuthLoading] = useState(false);

  const walletLogin = async () => {
    setAuthLoading(true);
    await authenticate();
    setAuthLoading(false);
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

      {!isAuthenticated ? (
        <div className="nav_links">
          {!authLoading ? (
            <button onClick={walletLogin} className="primary-btn">
              Join Me Now
            </button>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) : (
        <>
          <h4>Welcome {account}</h4>
          <Button action={logout} text="logout" />
        </>
      )}
    </header>
  );
}
