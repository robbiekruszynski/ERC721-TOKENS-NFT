pragma solidity  ^0.5.0;

import "./ERC721Full.sol";

contract Loot is ERC721Full {
    constructor() ERC721Full("item", "ITEM") public {

     }
}