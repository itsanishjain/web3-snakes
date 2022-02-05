import React from "react";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <header>
      <img src="snakelogo.png" className="logo" />
      <nav>
        <ul className="nav_links">
          <li>
            <Link href="https://github.com/itsanishjain">
              <a className="">About</a>
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/itsanishjain">
              <a>contact</a>
            </Link>
          </li>
        </ul>
      </nav>
      <Link href="https://twitter.com/itsanishjain">
        <button className="primary-btn">Join Me Now</button>
      </Link>
    </header>
  );
}
