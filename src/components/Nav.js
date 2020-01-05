import React, { Component } from "react";
import Web3 from "web3";
import Loot from "../abis/Loot.json";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

class Nav extends Component {
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

    if (networkData) {
      const abi = Loot.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });
      const totalSupply = await contract.methods.totalSupply().call();
      this.setState({ totalSupply });

      // // Loading the  Colors
      for (var i = 1; i <= totalSupply; i++) {
        const item = await contract.methods.items(i - 1).call();
        this.setState({
          items: [...this.state.items, item]
        });
      }
    } else {
      window.alert("Smart contract not deployed to detected network.");
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
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <h3>Token Mill</h3>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white">
              <span id="account">{this.state.account} </span>
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Nav;
