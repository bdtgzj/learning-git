pragma solidity ^0.4.24;

contract SimpleContract {
    event Print(uint);
    function multiply(uint a) public returns(uint d)  {
        emit Print(a * 7);
        return a * 7;
    }
}