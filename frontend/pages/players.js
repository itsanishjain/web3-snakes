import React from "react";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";

import { useMoralis } from "react-moralis";

import Button from "../src/components/Button";
import contractABI from "../SnakeABI.json";
const contractAddress = "0xAbE04380524Ac99c0E4c15c336FdbA0CE1792717";

export default function Players() {
  const [allPlayers, setAllPlayers] = useState();
  const [isMinted,setIsMisted] = useState(false)
  const { account } = useMoralis();

  console.log(useMoralis());

  useEffect(() => {
    fetchAllPlayer();
  }, []);

  const mintNFT = (_address) => {
    console.log("MINTED");
    fetch("https://api.nftport.xyz/v0/mints/easy/urls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "198adc16-5d25-450e-bf19-130b0880a38a",
      },
      body: `{"chain":"polygon","name":"Type your NFT name here","description":"Type your NFT description here","file_url":"https://i.ibb.co/4Fzqb8p/download.jpg","mint_to_address":${_address}}`,
    })
      .then((response) => {
        console.log(response);
        console.log("SUCCESS");
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
                <th>Address</th>
                <th>Score</th>
                <th>YOU GOT NFT</th>
              </tr>
            </thead>
            <tbody>
              {allPlayers.map((player, index) => (
                <tr key={index}>
                  <td>{player.playersAddress}</td>
                  <td>{player.score}</td>
                  <td>
                    {index < 3 ? (
                      <>
                        <Button
                          action={() => mintNFT(player.playersAddress)}
                          text="MINT"
                        />
                        <a style={{fontSize:"1rem",display:"block",color:"white"}}
                          href={`https://opensea.io/${player.playersAddress}?tab=private`}
                        >Here is your minted NFT</a>
                      </>
                    ) : (
                      "NO"
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
