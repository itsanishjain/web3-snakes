import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/snakelogo.png";

export default function NavigationBar() {
  return (
    <header>
      {/* <img src="snakelogo.png" className="logo" alt="logo" /> */}
      <div className="logo">
      <Image alt="snake logo" src={logo} className="logo" width={128} height={128}  />
      </div>
      <nav>
        <ul className="nav_links">
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
      <Link href="https://twitter.com/itsanishjain" passHref>
        <button className="primary-btn">Join Me Now</button>
      </Link>
    </header>
  );
}
