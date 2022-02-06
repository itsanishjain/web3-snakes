import React from "react";
import { WiDayLightning } from "react-icons/wi";
import Game from "./Game";

export default function Board() {
  const moodlyLogo = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "6rem",
  };

  return (
    // <div className="rainbow-card">
    <div className="card">
      <p>Game Begins</p>
      <div style={moodlyLogo}>
        {/* <WiDayLightning /> */}
        {/* <div className="loader loader-center"></div> */}
        <Game />
      </div>
    </div>
    // </div>
  );
}
