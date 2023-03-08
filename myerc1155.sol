// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";


contract Myerc1155 is ERC1155, Ownable, Pausable, ERC1155Supply, PaymentSplitter {
    uint256 public publicPrice = 0.002 ether;
    uint256 public allowListPrice = 0.001 ether;
    uint256 public maxSupply  = 20;
    uint public maxPerWallet = 3;

    bool public publicMintOpen = false;
    bool public allowListMintOpen = true;

    mapping(address => bool) allowList;
    mapping(address => uint256) purchasesPerWallet;


    constructor(
        address[] memory _payees,
        uint256[] memory _shares
    )
        ERC1155("ipfs://Qmaa6TuP2s9pSKczHF4rwWhTKUdygrrDs8RmYYqCjP3Hye/")
        PaymentSplitter(_payees, _shares)

    {}

    // Create edit function that will edit mint windows
    function editMintWindows(
             bool _publicMintOpen,
             bool _allowListMintOpen
    ) external onlyOwner {

      publicMintOpen = _publicMintOpen;
      allowListMintOpen = _allowListMintOpen;
    }

    // Create a function to set the allowlist
    function setAllowList(address[] calldata addresses) external onlyOwner {
        for(uint256 i=0; i< addresses.length; i++){
            allowList[addresses[i]] = true;
        }
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    } 


    function publicMint(uint256 id, uint256 amount)
        public
        payable
    {
        require(publicMintOpen, "Public List mint is closed");
        // require(id < 2, "Sorry looks like you try to mint a wrong NFT");
        require(msg.value == publicPrice * amount, "Wrong! Not enough money sent");
        // require(totalSupply(id) + amount <= maxSupply, "Sorry, max mint limit reached");
        // _mint(msg.sender, id, amount, "");
        mint(id, amount);
    } 

    function allowListMint(uint256 id, uint256 amount) public payable {
        require(allowListMintOpen, "Allow List mint is closed");
        require(allowList[msg.sender], "You are not in the allowList");
        // require(id < 2, "Sorry looks like you try to mint a wrong NFT");
        require(msg.value == allowListPrice * amount);
        // require(totalSupply(id) + amount <= maxSupply, "Sorry, max mint limit reached");
        // _mint(msg.sender, id, amount, "");
        mint(id, amount);

    }

    function mint(uint256 id, uint256 amount) internal {
        require(purchasesPerWallet[msg.sender] + amount <= maxPerWallet, "Wallet limit reached");
        require(id < 2, "Sorry looks like you try to mint a wrong NFT");
        require(totalSupply(id) + amount <= maxSupply, "Sorry, max mint limit reached");
        _mint(msg.sender, id, amount, "");
        purchasesPerWallet[msg.sender] += amount;
    }

    function withdraw(address _addr) external onlyOwner {
        uint256 balance = address(this).balance;
        payable(_addr).transfer(balance); 
    }

    // function uri(uint256 _id) public view virtual override returns (string memory) {
    //     require(exists(_id), "URI: nonexistent token");
    //     return string(abi.encodePacked(super.uri(_id), Strings.toString(_id), ".json"));

    // }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}