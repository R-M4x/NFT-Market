const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
  it("Should mint, list, and buy NFT", async function () {
    const [owner, buyer] = await ethers.getSigners();
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const marketplace = await NFTMarketplace.deploy();
    await marketplace.waitForDeployment();

    const mintTx = await marketplace.mintNFT(owner.address, "tokenURI");
    await mintTx.wait();

    await marketplace.listNFT(1, ethers.parseEther("1"));

    await expect(
      marketplace.connect(buyer).buyNFT(1, { value: ethers.parseEther("1") })
    ).to.changeEtherBalances(
      [owner, buyer],
      [ethers.parseEther("1"), ethers.parseEther("-1")]
    );
  });
});
