// SPDX-License-Identifier: MIT
pragma solidity 0.8.4; //Do not change the solidity version as it negativly impacts submission grading

import "hardhat/console.sol";
import "./ExternalContract.sol";

contract Staker {
	ExternalContract public externalContract;
	address public owner;
	uint256 public apy; // APY represented in percentage (e.g., 5% as 500)

	constructor(address externalContractAddress) {
		externalContract = ExternalContract(externalContractAddress);
		owner = msg.sender;
		apy = 438; // Set an initial APY of 4.38%
	}

	// Modifier to check that ExternalContract is not completed
	modifier notCompleted() {
		require(
			!externalContract.completed(),
			"Staking process already completed"
		);
		_;
	}

	modifier onlyOwner() {
		require(msg.sender == owner, "Only the owner can update APY");
		_;
	}

	// Collect funds in a payable `stake()` function and track individual `balances` with a mapping:
	// (Make sure to add a `Stake(address,uint256)` event and emit it for the frontend `All Stakings` tab to display)
	mapping(address => uint256) public balances;
	uint256 public constant threshold = 100 ether;
	uint256 public deadline = block.timestamp + 168 hours;
	uint256 public constant secondsPerWeek = 604800; // Number of seconds in a week

	bool public openForWithdraw;

	// User address => rewardPerTokenStored
	mapping(address => uint) public userRewardPerTokenPaid;
	mapping(address => uint256) public stakedMATIC;
	address[] public participants;
	uint256 public totalStakedMATIC;

	//Events
	event Receieve(address indexed staker, uint256 amount);
	event WithdrawEnabled(bool enabled);
	event Stake(address indexed staker, uint256 amount);
	event Entry(address indexed user, uint256 entries);

	//functions
	function setAPY(uint256 newAPY) external onlyOwner {
		require(newAPY >= 0, "APY cannot be negative");
		apy = newAPY;
	}

	// Function to select 3 random winners
	function selectWinners() external {
		require(
			participants.length >= 3,
			"Not enough participants for a raffle"
		);

		// Generate random numbers based on block hash
		uint256 seed = uint256(blockhash(block.number - 1));

		// Initialize an array to track selected winners
		address[3] memory winners;

		// Randomly select 3 winners
		for (uint256 i = 0; i < 3; i++) {
			uint256 randomIndex = uint256(seed + i) % participants.length;
			address winner = participants[randomIndex];
			winners[i] = winner;
		}

		// Distribute rewards to winners (example: transfer equivalent tokens)
		// You can define your own reward distribution logic here

		// Clear the participant list and reset total staked amount
		for (uint256 i = 0; i < participants.length; i++) {
			delete stakedMATIC[participants[i]];
		}
		delete participants;
		totalStakedMATIC = 0;
	}

	// Function to calculate the next Sunday at 00:00:01 GMT
	function calculateNextSunday() internal view returns (uint256) {
		uint256 currentTimestamp = block.timestamp;
		uint256 daysUntilNextSunday = (7 -
			((currentTimestamp / 86400 + 4) % 7));
		uint256 secondsUntilNextSunday = daysUntilNextSunday * 86400 + 1;
		return currentTimestamp + secondsUntilNextSunday;
	}

	// Function to reset the deadline to the next Sunday at 00:00:01 GMT
	function resetDeadline() external {
		require(msg.sender == owner, "Only the owner can reset the deadline");
		deadline = calculateNextSunday();
	}

	// Function to calculate the APY in terms of a rate per second
	function getRatePerSecond() public view returns (uint256) {
		// Convert the annual percentage yield (APY) to a rate per second
		// Formula: (1 + APY / 100) ^ (1 / secondsPerYear) - 1
		uint256 secondsPerYear = 31536000; // 365 days
		return ((apy + 100) ** (1e18 / secondsPerYear) - 1);
	}

	// Function to calculate the annual earnings based on a deposit
	function calculateEarnings(
		uint256 depositAmount,
		uint256 durationInSeconds
	) external view returns (uint256) {
		uint256 ratePerSecond = getRatePerSecond();
		return (depositAmount * ratePerSecond * durationInSeconds) / 1e18;
	}

	function stake() public payable {
		require(
			msg.value <= threshold,
			"Staking amount must not be greater than 1000 MATIC"
		);
		require(msg.value > 0, "Set a value more than 0 MATIC");
		balances[msg.sender] += msg.value;
		emit Stake(msg.sender, msg.value);

		// Calculate the number of entries based on staked amount (0.1 MATIC per entry)
		uint256 entries = msg.value / 100000000000000000; // 0.1 MATIC in wei

		// Add the user to the participant list for each entry and emit an event
		for (uint256 i = 0; i < entries; i++) {
			participants.push(msg.sender);
			emit Entry(msg.sender, 1);
		}
	}

	// After some `deadline` allow anyone to call an `execute()` function
	function execute() external notCompleted {
		require(block.timestamp > deadline, "Deadline has not expired");
		if (address(this).balance >= threshold) {
			// If the deadline has passed and the threshold is met, it should call `externalContract.complete{value: address(this).balance}()`
			externalContract.complete{ value: address(this).balance }();
		} else {
			// If the `threshold` was not met, allow everyone to call a `withdraw()` function to withdraw their balance
			openForWithdraw = true;
			emit WithdrawEnabled(true);
		}
	}

	// Add a `timeLeft()` view function that returns the time left before the deadline for the frontend
	function timeLeft() public view returns (uint256) {
		if (block.timestamp >= deadline) {
			return 0;
		}
		return deadline - block.timestamp;
	}

	// Function to withdraw staked ETH
	function withdraw(uint256 amount) external notCompleted {
		require(openForWithdraw, "Withdraw is not yet enabled");
		require(amount > 0, "Amount must be greater than 0");
		require(balances[msg.sender] >= amount, "Insufficient balance");

		balances[msg.sender] -= amount;
		payable(msg.sender).transfer(amount);
	}

	// Add the `receive()` special function that receives eth and calls stake()
	receive() external payable {
		stake();
		emit Receieve(msg.sender, msg.value);
	}
}
