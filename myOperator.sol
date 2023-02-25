// SPDX-License-Identifier: MIT
pragma solidity 0.8.5;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.1.0/contracts/token/ERC20/ERC20.sol";

contract MyERC20Operator {

  mapping (address=>uint) public balances;
  ERC20 my_erc20;

  constructor (address my_erc20_address)
  {
    my_erc20 = ERC20(my_erc20_address);
  }

  function deposit(uint amount) public
  {
    my_erc20.transferFrom(address(msg.sender), address(this), amount);
    balances[msg.sender] += amount;
  }

  function retrieveTokens() public
  {
    my_erc20.transfer(address(msg.sender), balances[msg.sender]);
    balances[msg.sender] = 0;
  }
}