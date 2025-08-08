# Base Minimal Staking Protocol

🚀 **Part of Base Builder Rewards Summer League Strategy**

A decentralized ETH staking protocol built specifically for Base blockchain, designed to earn Builder Rewards points through verified smart contract deployment.

## 🎯 Builder Rewards Integration

This project is part of the [Base Builder Rewards Summer League](https://builderscore.xyz) strategy to:
- Deploy verified smart contracts on Base Mainnet
- Contribute quality code to the Base ecosystem
- Earn weekly ETH rewards for top 100 builders

## 📋 Features

- **Simple ETH Staking**: Stake ETH and earn 1% annual rewards
- **Instant Withdrawals**: Withdraw your stake anytime
- **Reward Claims**: Claim accumulated rewards separately
- **Gas Optimized**: Minimal contract size for lower deployment costs
- **Base Native**: Built specifically for Base blockchain

## 🛠 Technical Stack

- **Solidity**: Smart contract development
- **Hardhat**: Development framework
- **Base Mainnet**: Target deployment network
- **Basescan**: Contract verification

## 🚀 Quick Start

### Prerequisites
```bash
npm install -g hardhat
```

### Installation
```bash
git clone https://github.com/wearedood/base-minimal-staking-v2.git
cd base-minimal-staking-v2
npm install
```

### Deployment

1. **Configure Environment**
   ```bash
   cp .env.example .env
   # Add your private key and Base RPC URL
   ```

2. **Deploy to Base Mainnet**
   ```bash
   npx hardhat run scripts/deploy.js --network base
   ```

3. **Verify on Basescan**
   ```bash
   npx hardhat verify --network base <CONTRACT_ADDRESS>
   ```

## 📊 Builder Rewards Impact

- **Smart Contract Deployment**: 100 points
- **Contract Verification**: 150 points
- **GitHub Repository**: 100 points
- **Total Expected**: 350+ Builder Rewards points

## 🔗 Links

- [Base Builder Rewards](https://builderscore.xyz)
- [Base Documentation](https://docs.base.org)
- [Basescan](https://basescan.org)

## 📄 License

MIT License - Built for the Base ecosystem

---

**Building on Base 🔵 | Earning Builder Rewards 💰**
