import React from "react";
import { useEffect, useState } from "react";
// import path from "path";
// import Button from "./Button";

import { ethers } from "ethers";

import contractABI from "../../SnakeABI.json";
import Button from "./Button";
const contractAddress = "0xAbE04380524Ac99c0E4c15c336FdbA0CE1792717";

export default function Game() {
  let START2 = 0;
  const [restart, setRestart] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [SCORE, setSCORE] = useState(0); // current user score

  const [allPlayers, setAllPlayers] = useState(); // everyone

  const [sendLoading, setSendLoading] = useState(false);

  const toInt = (n) => {
    return parseInt(ethers.utils.formatUnits(n) * 10 ** 18);
  };

  const sortObject = (dataObj) => {
    dataObj.sort(function (a, b) {
      return b.score - a.score;
    });
  };

  // Fetches the players
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

  useEffect(() => {
    fetchAllPlayer();
  }, []);

  useEffect(() => {
    console.log("FETCH DONE>>>>>>>>>>>>>>>");

    const cvs = document.getElementById("snake");
    const ctx = cvs.getContext("2d");

    // create the unit
    const box = 32;
    // load images

    const ground = new Image();
    ground.src = "img/ground.png";

    const foodImg = new Image();
    foodImg.src = "img/food.png";

    // load audio files

    let dead = new Audio();
    let eat = new Audio();
    let up = new Audio();
    let right = new Audio();
    let left = new Audio();
    let down = new Audio();

    dead.src = "audio/dead.mp3";
    eat.src = "audio/eat.mp3";
    up.src = "audio/up.mp3";
    right.src = "audio/right.mp3";
    left.src = "audio/left.mp3";
    down.src = "audio/down.mp3";

    // create the snake

    let snake = [];

    snake[0] = {
      x: 9 * box,
      y: 10 * box,
    };

    // create the food

    let food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };

    // create the score var

    let score = 0;

    //control the snake

    let d;

    document.addEventListener("keydown", direction);

    function direction(event) {
      let key = event.keyCode;
      setIsGameEnd(false);
      if (key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
      } else if (key == 38 && d != "DOWN") {
        d = "UP";
        up.play();
      } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
        right.play();
      } else if (key == 40 && d != "UP") {
        d = "DOWN";
        down.play();
      }
    }

    // cheack collision function
    function collision(head, array) {
      for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
          return true;
        }
      }
      return false;
    }

    // draw everything to the canvas

    function draw() {
      ctx.drawImage(ground, 0, 0);

      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
      }
      ctx.drawImage(foodImg, food.x, food.y);

      // old head position
      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      // which direction
      if (d == "LEFT") snakeX -= box;
      if (d == "UP") snakeY -= box;
      if (d == "RIGHT") snakeX += box;
      if (d == "DOWN") snakeY += box;

      // if the snake eats the food
      if (snakeX == food.x && snakeY == food.y) {
        score++;
        setSCORE(score);
        eat.play();
        food = {
          x: Math.floor(Math.random() * 17 + 1) * box,
          y: Math.floor(Math.random() * 15 + 3) * box,
        };
        // we don't remove the tail
      } else {
        // remove the tail
        snake.pop();
      }

      // add new Head

      let newHead = {
        x: snakeX,
        y: snakeY,
      };

      // game over

      if (
        snakeX < box ||
        snakeX > 17 * box ||
        snakeY < 3 * box ||
        snakeY > 17 * box ||
        collision(newHead, snake)
      ) {
        console.log("GAME END MF");
        setRestart(!restart);

        // some fuction to send our data to sc // check score is under top 3
        // SCORE
        if (allPlayers && allPlayers.length == 0 && START2) {
          for (let i = 0; i < allPlayers.length && 3; i++) {
            let s = allPlayers[i].score;
            if (SCORE > s) {
              setIsGameEnd(true);
            } else {
              console.log("YOUR SCORE IS LESS ");
              // setIsGameEnd(true);
            }
          }
        } else {
          setIsGameEnd(true);
          START2 = 1;
          console.log("NNNNNNNNNNNNNNNNNNNNNNNNNNNN");
        }
        clearInterval(game);
        dead.play();
      }

      snake.unshift(newHead);

      ctx.fillStyle = "white";
      ctx.font = "45px Changa one";
      ctx.fillText(score, 2 * box, 1.6 * box);
    }

    // call draw function every 100 ms

    let game = setInterval(draw, 100);
  }, [restart]);

  // useEffect ends here //

  // Add data to SC
  const addPlayer = async () => {
    setSendLoading(true);
    console.log("adding player");
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // signer is used for setting data to SCs
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const transaction = await contract.addPlayer(SCORE);
    await transaction.wait();
    setSendLoading(false);
    setIsGameEnd(false);
    console.log("ADD PLAYER COOL");
  };

  const canvasStyle = {
    display: "block",
    margin: "0 auto",
    backgroundColor: "black",
  };

  console.log("SCORE>>>>>", SCORE);
  console.log("PLAYERS", allPlayers);

  return (
    <>
      <div>
        <canvas
          style={canvasStyle}
          id="snake"
          width="608"
          height="608"
        ></canvas>
      </div>

      {isGameEnd ? (
        !sendLoading ? (
          <div style={{ marginTop: "30px" }} className="loader-center">
            <Button text="SEND SCORE" action={() => addPlayer()} />
          </div>
        ) : (
          <>
            <div style={{ marginTop: "30px" }} className="loader-center">
              <div className="loader"></div>
            </div>
          </>
        )
      ) : null}
    </>
  );
}
