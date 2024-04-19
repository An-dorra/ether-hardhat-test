//SPDX-License-Identifier:MIT
pragma solidity ^0.8.7;
import {AggregatorV3Interface} from "./AggregatorV3Interface.sol";

// import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol"
// import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * Network: sepolia
 * Aggregator: ETH/USD
 * Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
 */
library PriceCoversionLibary {
    function getPrice(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        // AggregatorV3Interface priceFeed = AggregatorV3Interface(
        //     0x694AA1769357215DE4FAC081bf1f309aDC325306
        // );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return uint(price * 1e10);
    }

    // function getVersion() internal view returns (uint256) {
    //     AggregatorV3Interface pticeFeed = AggregatorV3Interface(
    //         0x694AA1769357215DE4FAC081bf1f309aDC325306
    //     );
    //     return pticeFeed.version();
    // }

    function getConversionRate(
        uint ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint) {
        uint ethPrice = getPrice(priceFeed);
        uint ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUsd;
    }
}
