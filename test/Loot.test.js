const Loot = artifacts.require("./Loot.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Loot", accounts => {
  let contract;

  before(async () => {
    contract = await Loot.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = contract.address;

      //   assert.notEqual(address, " ");
      //   assert.notEuqal(address, 0x0);
      //   assert.notEuqal(address, null);
      //   assert.notEuqal(address, undefined);
    });

    it("has a name", async () => {
      const name = await contract.name();
      assert.equal(name, "item");
    });

    it("has a symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "ITEM");
    });
  });
});
