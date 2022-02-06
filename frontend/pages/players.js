import React from "react";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";

import contractABI from "../SnakeABI.json";
const contractAddress = "0xc91857022E0e8E39b4B87696423D1e0217BcD2f7";

export default function Players() {
  const [allPlayers, setAllPlayers] = useState();

  useEffect(() => {
    fetchAllPlayer();
  }, []);

  const toInt = (n) => {
    return parseInt(ethers.utils.formatUnits(n) * 10 ** 18);
  };

  const sortObject = (dataObj) => {
    dataObj.sort(function (a, b) {
      return b.score - a.score;
    });
  };

  const fetchAllPlayer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    try {
      let data = await contract.getAllPlayers();
      let dataArr = [];
      data.map((d, i) => {
        let o = {
          id: toInt(d.id),
          name: d.name,
          playersAddress: d.playersAddress,
          score: toInt(d.score),
        };
        dataArr.push(o);
      });

      sortObject(dataArr);
      setAllPlayers(dataArr);
    } catch (error) {
      console.log("ERROR in fetching data...", error);
    }
  };
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          color: "wheat",
          fontFamily: "monospace",
          fontSize: "2rem",
        }}
      >
        PLAYER
      </div>
      <hr />
      <div className="table-container">
        {allPlayers ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {allPlayers.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.playersAddress}</td>
                  <td>
                    {parseInt(
                      ethers.utils.formatUnits(player.score) * 10 ** 18
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="loader-center">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
}
