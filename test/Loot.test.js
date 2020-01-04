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

  describe("minting", async () => {
    it("creates a new token", async () => {
      const result = await contract.mint("#EC058E");
      const totalSupply = await contract.totalSupply();
      // SUCCESS
      assert.equal(totalSupply, 1);
      const event = result.logs[0].args;
      assert.equal(event.tokenId.toNumber(), 1, "id is correct");
      assert.equal(
        event.from,
        "0x0000000000000000000000000000000000000000",
        "from is correct"
      );
      assert.equal(event.to, accounts[0], "to is correct");

      // FAILURE: cannot mint same color twice
      await contract.mint("#EC058E").should.be.rejected;
    });
  });

  describe("indexing", async () => {
    it("lists colors", async () => {
      //Mint 2 tokens
      await contract.mint("#5386E4");
      await contract.mint("#000000");
      const totalSupply = await contract.totalSupply();

      let item;
      let result = [];

      for (var i = 1; i <= totalSupply; i++) {
        item = await contract.items(i - 1);
        result.push(item);
      }
      let expected = ["#EC058E", "#5386E4", "#000000"];
      assert.equal(result.join(","), expected.join(","));
    });
  });
});
