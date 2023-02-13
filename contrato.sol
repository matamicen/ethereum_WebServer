// SPDX-License-Identifier: MIT
pragma solidity 0.8.5;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.1.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.1.0/contracts/access/Ownable.sol";

contract MyERC20 is ERC20, Ownable {
  uint256 public token_transfer_count = 0;
  event NewMint(address indexed user, uint timestamp);
  event NewBurn(address indexed user, uint timestamp);

  constructor () ERC20("Token", "TK3") {
    _mint(msg.sender, 1000 ether);
  }

  receive() external payable {
    // This function receives ETH sent to the contract
  }

  function withdraw(uint256 amount) public onlyOwner {
    uint balance = address(this).balance;
    require(balance >= amount, "Contract does not have enough ETH to withdraw");
    payable(msg.sender).transfer(amount);
  }


  function mint(address account, uint256 amount) public onlyOwner {
    _mint(account, amount);
    emit NewMint(msg.sender, block.timestamp);
  }

  function burn(address account, uint256 amount) public {
    _burn(account, amount);
    emit NewBurn(msg.sender, block.timestamp);
  }

  function _beforeTokenTransfer(address from, address to, uint256 amount) internal override
  {
    token_transfer_count += 1;
  }
}
