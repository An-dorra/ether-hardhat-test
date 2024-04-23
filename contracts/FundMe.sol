//SPDX-License-Identifier:MIT
pragma solidity ^0.8.7;
import "./PriceLibary.sol";

error NotOwner();

contract FundMe {
    using PriceCoversionLibary for uint256;
    uint256 public constant MINIMUM_USD = 20 * 1e18;
    mapping(address => uint256) public addressToAmountFuned;
    uint public number;
    address[] public funders;
    address public immutable iowner;
    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAddress) {
        iowner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    modifier onlyOwner() {
        if (msg.sender != iowner) {
            revert NotOwner();
        }
        _;
    }

    function fund() public payable {
        require(
            msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
            "Didn't send enough"
        );
        funders.push(msg.sender);
        addressToAmountFuned[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        uint256 len = funders.length;
        for (uint256 i = 0; i < len; i++) {
            address funder = funders[i];
            addressToAmountFuned[funder] = 0;
        }

        //重置funders
        funders = new address[](0);

        //转账
        // tranfer
        // payable (msg.sender).transfer(address(this).balance);
        // //send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess,"Send failed");

        //call
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    function cheapWithDraw() public payable onlyOwner {
        address[] memory c_funders = funders;
        uint256 len = c_funders.length;
        for (uint i = 0; i < len; i++) {
            address funder = c_funders[i];
            addressToAmountFuned[funder] = 0;
        }
        funders = new address[](0);
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");

        require(success, "Call failed");
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
