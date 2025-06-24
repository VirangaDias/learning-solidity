const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const {deployTokenFixture}= require("./helpers/TokenFixtures");
const tokens = (n)=>{
    return ethers.parseUnits(n,18)
}

describe("Token", function () {
  it("has correct name", async function () {
    const { token } = await loadFixture(deployTokenFixture);
    const name = await token.name();
    expect(name).to.equal("My Token");
  });

  it("has correct symbol", async function () {
    const { token } = await loadFixture(deployTokenFixture);
    const symbol = await token.symbol();
    expect(symbol).to.equal("DAPP");
  });

  it("has correct decimals", async function () {
    const { token } = await loadFixture(deployTokenFixture);
    const decimals = await token.decimals();
    expect(decimals).to.equal(18);
  });

  it("has correct total supply", async function () {
    const { token } = await loadFixture(deployTokenFixture);
    const totalSupply = await token.totalSupply();
    expect(totalSupply).to.equal(tokens("1000000"));
  });
  
});
