const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { deployTokenFixture } = require("./helpers/TokenFixtures");

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 18);
};

describe("Token Test Cases", function () {
  describe("Deployment Test Cases", () => {
    const NAME = "My Token";
    const SYMBOL = "DAPP";
    const DECIMALS = 18;
    const TOKEN_SUPPLY = tokens("1000000");

    it("has correct name", async function () {
      const { token } = await loadFixture(deployTokenFixture);
      const name = await token.name();
      expect(name).to.equal(NAME);
    });

    it("has correct symbol", async function () {
      const { token } = await loadFixture(deployTokenFixture);
      const symbol = await token.symbol();
      expect(symbol).to.equal(SYMBOL);
    });

    it("has correct decimals", async function () {
      const { token } = await loadFixture(deployTokenFixture);
      const decimals = await token.decimals();
      expect(decimals).to.equal(DECIMALS);
    });

    it("has correct total supply", async function () {
      const { token } = await loadFixture(deployTokenFixture);
      const totalSupply = await token.totalSupply();
      expect(totalSupply).to.equal(TOKEN_SUPPLY);
    });

    it("assigns total supply to deployer", async function () {
      const { token, deployer } = await loadFixture(deployTokenFixture);
      const deployerBalance = await token.balanceof(deployer.address);
      expect(deployerBalance).to.equal(TOKEN_SUPPLY);
    });
  });

  describe("Sending Tokens", () => {
    it("transfers token balances", async () => {
      const AMOUNT = tokens(100);
      const { token, deployer, receiver } = await loadFixture(deployTokenFixture);
    
      const transaction = await token.transfer(receiver.address, AMOUNT);
      await transaction.wait();
    
      expect(await token.balanceof(deployer.address)).to.equal(tokens(999900));
      expect(await token.balanceof(receiver.address)).to.equal(AMOUNT); 
    });    
  });
  
});
