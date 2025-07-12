// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Token {
    string public name ;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply ;

    mapping (address => uint256) public balanceof;

    event Transfer(address indexed _from,address indexed to,uint256 _value);

    constructor(string memory _name,string memory _symbol,uint256 _totalSupply){
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply* (10 ** decimals);
        balanceof[msg.sender] = totalSupply;
    }
    function transfer (address _to,uint256 _value) public returns (bool successs){
       require(balanceof[msg.sender] >= _value,"Token:insuficient Funds");
       require(_to != address(0),"Token: Recipient addres 0");

        balanceof[msg.sender] -= _value;
        balanceof[_to] += _value;
        emit Transfer(msg.sender,_to,_value);
        
        return true;
    }

}

