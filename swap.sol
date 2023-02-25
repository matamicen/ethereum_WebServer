// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ERC20Swap {
    address public token1;
    address public token2;

    constructor(address _token1, address _token2) {
        token1 = _token1;
        token2 = _token2;
    }

    function swap(uint256 amount) public {
        IERC20(token1).transferFrom(msg.sender, address(this), amount);
        IERC20(token2).transfer(msg.sender, amount);
    }
}
