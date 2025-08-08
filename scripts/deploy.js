const hre = require("hardhat");

async function main() {
  console.log("Deploying MinimalStaking contract to Base...");
  
  // Get the contract factory
  const MinimalStaking = await hre.ethers.getContractFactory("MinimalStaking");
  
  // Deploy the contract
  const minimalStaking = await MinimalStaking.deploy();
  
  // Wait for deployment to complete
  await minimalStaking.waitForDeployment();
  
  const contractAddress = await minimalStaking.getAddress();
  
  console.log("MinimalStaking deployed to:", contractAddress);
  console.log("Network:", hre.network.name);
  console.log("Deployer:", (await hre.ethers.getSigners())[0].address);
  
  // Wait for a few block confirmations before verification
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await minimalStaking.deploymentTransaction().wait(5);
    
    // Verify the contract on Basescan
    console.log("Verifying contract on Basescan...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("Contract verified successfully!");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
