// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Snake {
    
    uint ID = 0; // PRIMARY KEY
    struct Player {
        uint id;
        address playersAddress;
        string name;
        uint score;
    }

    Player[] players;

    function addPlayer(string memory _name) public   {
        Player memory player = Player({
            id:ID,
            playersAddress: msg.sender,
            name: _name,
            score:0
        });
        players.push(player);
        ID++;

    }

    function getAllPlayers() public view returns(Player[] memory) {
        return players;
    }

    function updatePlayerScore(uint _id,uint _score) public {
        Player memory p = players[_id];
        require(p.playersAddress==msg.sender,"You can update your score only");
        players[_id].score = _score;
    } 

    function getCurrentTime() public view returns(uint){
        return block.timestamp + 24 hours ; // seconds, minutes, hours, days, years
    }
}