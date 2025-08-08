// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title MinimalStaking
 * @dev A simple ETH staking contract for Base blockchain
 * @notice Part of Base Builder Rewards Summer League Strategy
 */
contract MinimalStaking {
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public stakingTimestamp;
    
    uint256 public totalStaked;
    uint256 public constant MINIMUM_STAKE = 0.01 ether;
    uint256 public constant REWARD_RATE = 5; // 5% annual reward
    
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);
    
    /**
     * @dev Stake ETH in the contract
     */
    function stake() external payable {
        require(msg.value >= MINIMUM_STAKE, "Minimum stake is 0.01 ETH");
        
        // If user already has stake, calculate and add rewards
        if (stakedAmount[msg.sender] > 0) {
            uint256 reward = calculateReward(msg.sender);
            stakedAmount[msg.sender] += reward;
        }
        
        stakedAmount[msg.sender] += msg.value;
        stakingTimestamp[msg.sender] = block.timestamp;
        totalStaked += msg.value;
        
        emit Staked(msg.sender, msg.value);
    }
    
    /**
     * @dev Unstake ETH and claim rewards
     */
    function unstake() external {
        require(stakedAmount[msg.sender] > 0, "No stake found");
        
        uint256 stakedEth = stakedAmount[msg.sender];
        uint256 reward = calculateReward(msg.sender);
        uint256 totalAmount = stakedEth + reward;
        
        // Reset user's stake
        stakedAmount[msg.sender] = 0;
        stakingTimestamp[msg.sender] = 0;
        totalStaked -= stakedEth;
        
        // Transfer ETH back to user
        (bool success, ) = msg.sender.call{value: totalAmount}("");
        require(success, "Transfer failed");
        
        emit Unstaked(msg.sender, stakedEth, reward);
    }
    
    /**
     * @dev Calculate reward for a user
     */
    function calculateReward(address user) public view returns (uint256) {
        if (stakedAmount[user] == 0) return 0;
        
        uint256 stakingDuration = block.timestamp - stakingTimestamp[user];
        uint256 annualReward = (stakedAmount[user] * REWARD_RATE) / 100;
        
        // Calculate reward based on time staked (seconds in a year: 31536000)
        return (annualReward * stakingDuration) / 31536000;
    }
    
    /**
     * @dev Get user's total balance (stake + rewards)
     */
    function getUserBalance(address user) external view returns (uint256) {
        return stakedAmount[user] + calculateReward(user);
    }
    
    /**
     * @dev Get contract's ETH balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Emergency withdraw (only for testing)
     */
    function emergencyWithdraw() external {
        require(stakedAmount[msg.sender] > 0, "No stake found");
        
        uint256 amount = stakedAmount[msg.sender];
        stakedAmount[msg.sender] = 0;
        stakingTimestamp[msg.sender] = 0;
        totalStaked -= amount;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}
