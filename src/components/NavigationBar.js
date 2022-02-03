import React from "react";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <header>
      <img src="bye.png" className="logo text-3d" />
      <nav>
        <ul className="nav_links">
          <li>
            <Link href="/">
              <a className="">About</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>contact</a>
            </Link>
          </li>
        </ul>
      </nav>
      <button className="primary-btn">Join Me Now</button>
    </header>
  );
}
