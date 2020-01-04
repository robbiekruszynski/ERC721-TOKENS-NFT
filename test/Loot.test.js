const Loot = artifacts.require("Loot.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Loot", accounts => {
  let contract;

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      contract = await Loot.deployed();
      const address = contract.address;
      assert.notEqual(address, " ");
    });
  });
});
