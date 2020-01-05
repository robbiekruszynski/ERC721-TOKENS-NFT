import React, { Component } from "react";
import Web3 from "web3";
import Loot from "../abis/Loot.json";
import "./App.css";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("non-eth browser dected. GET TO DA METAMASK!");
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = Loot.networks[networkId];
    console.log("pre networkdata load");
    console.log(this.state.items);

    if (networkData) {
      const abi = Loot.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });
      const totalSupply = await contract.methods.totalSupply().call();
      this.setState({ totalSupply });
      console.log("pre color load");

      // // Loading the  Colors
      for (var i = 1; i <= totalSupply; i++) {
        const item = await contract.methods.items(i - 1).call();
        this.setState({
          items: [...this.state.items, item]
        });
        console.log("is this working?");
        console.log(this.state.item);
        console.log(this.state.items);
      }
    } else {
      window.alert("Smart contract not deployed to detected network.");
      console.log(this.state.items);
    }
  }

  mint = item => {
    this.state.contract.methods
      .mint(item)
      .send({ from: this.state.account })
      .once("receipt", receipt => {
        this.setState({
          items: [...this.state.items, item]
        });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: " ",
      contract: null,
      totalSupply: 0,
      items: []
    };
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Loot Tokens
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">
                <span id="account">{this.state.account} </span>
              </small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1> Issue Token</h1>
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    const item = this.item.value;
                    this.mint(item);
                  }}
                >
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="#colorHEX"
                    ref={input => {
                      this.item = input;
                    }}
                  />
                  <input
                    type="submit"
                    className="btn btn-block btn-primary"
                    value="MINT"
                  />
                </form>
              </div>
            </main>
          </div>
          <hr />
          <div className="row text-center">
            {this.state.items.map((item, key) => {
              return (
                <div key={key} className="col-md-3 mb-3">
                  <div
                    className="token"
                    style={{ backgroundColor: item }}
                  ></div>
                  <div>[item]</div>
                  <p>Tokens go here...</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
