pragma solidity ^0.4.24;

contract HelloWorld {
  event Print(string out);
  function() public { emit Print("Hello, World!"); }
}
