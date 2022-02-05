// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract Snake {
    struct Player {
        address playersAddress;
        string name;  
        uint score;
    }

    Player[] public players;
    mapping(address => uint) score;

    function addPlayer(string memory _name) public   {
        Player memory player = Player({
            playersAddress: msg.sender,
            name: _name
        });
        players.push(player);
    }

    function updatePlayerScore(uint8 _score) public {
        score[msg.sender] = _score;
    } 

    function getCurrentTime() public view returns(uint){
        return block.timestamp;
    }

    function top3Player() public returns(Player[]){
        require(players.length>0,"NO Players Register");
        for(uint i=0;i<players.length;i++){
        }
    }
}