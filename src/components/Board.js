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
        <p>Rain</p>
        <div style={moodlyLogo}>
          <WiDayLightning />
        </div>
      </div>
    // </div>
  );
}
