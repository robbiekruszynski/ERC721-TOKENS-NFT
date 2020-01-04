pragma solidity  ^0.5.0;

import "./ERC721Full.sol";

contract Loot is ERC721Full {
    string[] public items;
    mapping(string => bool) _itemExists;
    constructor() ERC721Full("item", "ITEM") public {

     }

//change this to have aminter role opposed to public later on
     function mint (string memory _item) public {
         //require unique

         require(!_itemExists[_item]);
         uint _id = items.push(_item);
         _mint(msg.sender, _id);
         _itemExists[_item] = true;
         // Item - add
         //call the mint function 
         //tack it 
     }
}