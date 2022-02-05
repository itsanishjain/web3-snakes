import React from "react";
import { WiDayLightning } from "react-icons/wi";

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
        <div className="loader loader-center"></div>
      </div>
    </div>
    // </div>
  );
}
