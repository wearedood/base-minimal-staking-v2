contracts/MinimalStaking.sol  // SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title MinimalStaking
 * @dev A simple ETH staking contract for Base blockchain
 * @notice Part of Builder Rewards Summer League strategy
 */
contract MinimalStaking {
    mapping(address => uint256) public stakes;
    mapping(address => uint256) public rewards;
    
    uint256 public totalStaked;
    uint256 public rewardRate = 100; // 1% per year (100 basis points)
    uint256 public lastUpdateTime;
    
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    
    constructor() {
        lastUpdateTime = block.timestamp;
    }
    
    /**
     * @dev Stake ETH in the contract
     */
    function stake() external payable {
        require(msg.value > 0, "Cannot stake 0 ETH");
        
        updateRewards(msg.sender);
        
        stakes[msg.sender] += msg.value;
        totalStaked += msg.value;
        
        emit Staked(msg.sender, msg.value);
    }
    
    /**
     * @dev Withdraw staked ETH
     */
    function withdraw(uint256 amount) external {
        require(stakes[msg.sender] >= amount, "Insufficient stake");
        
        updateRewards(msg.sender);
        
        stakes[msg.sender] -= amount;
        totalStaked -= amount;
        
        payable(msg.sender).transfer(amount);
        
        emit Withdrawn(msg.sender, amount);
    }
    
    /**
     * @dev Claim accumulated rewards
     */
    function claimRewards() external {
        updateRewards(msg.sender);
        
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No rewards to claim");
        
        rewards[msg.sender] = 0;
        payable(msg.sender).transfer(reward);
        
        emit RewardsClaimed(msg.sender, reward);
    }
    
    /**
     * @dev Update rewards for a user
     */
    function updateRewards(address user) internal {
        if (stakes[user] > 0) {
            uint256 timeElapsed = block.timestamp - lastUpdateTime;
            uint256 reward = (stakes[user] * rewardRate * timeElapsed) / (365 days * 10000);
            rewards[user] += reward;
        }
        lastUpdateTime = block.timestamp;
    }
    
    /**
     * @dev Get user's current stake
     */
    function getStake(address user) external view returns (uint256) {
        return stakes[user];
    }
    
    /**
     * @dev Get user's pending rewards
     */
    function getPendingRewards(address user) external view returns (uint256) {
        if (stakes[user] == 0) return rewards[user];
        
        uint256 timeElapsed = block.timestamp - lastUpdateTime;
        uint256 pendingReward = (stakes[user] * rewardRate * timeElapsed) / (365 days * 10000);
        
        return rewards[user] + pendingReward;
    }
}
