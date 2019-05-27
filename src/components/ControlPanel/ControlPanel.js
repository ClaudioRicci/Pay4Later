import React, { Component } from "react";
//import { BrowserRouter, Route, NavLink, Link } from "react-router-dom"; // Imported but not used, would do so to link navigation in production
import axios from "axios"; // For Cross Browser supported Ajax requests
import "./ControlPanel.css"; // To illustrate use of Componentised CSS
import HeaderTwo from "./../HeaderTwo/HeaderTwo"; // To illustrate use of 'Styled-Components', which contains components CSS
import Table from "./../Table/Table"; // To illustrate use of 'Styled-Components', which contains components CSS

export default class ControlPanel extends Component {
  state = {
    merchantData: [],
    transactionsCount: 0,
    transactions: {},
    tableRows: [],
    // overallSubsidyToNumber: 0, //This is currently Incorrect, as it is a JSX Element, hence returning as NaN
    total: 0
  };

  componentDidMount() {
    const url = document.URL.slice(0, -1); //Remove trailing '/'
    const merchantNumber = url.substr(url.lastIndexOf("/"));
    const dataUrl = `http://interview.dekopay.com.s3.eu-west-2.amazonaws.com/merchants${merchantNumber}.json`;
    axios.get(dataUrl).then(res => {
      const merchantData = res.data;
      const transactions = merchantData.transactions;
      const pricing = merchantData.pricing;
      const transactionsCount = Object.keys(transactions);

      //Push all of the transaction prices into an array
      const totalPriceArray = [];
      Object.keys(transactions).forEach(function(item) {
        totalPriceArray.push(transactions[item].price);
      });

      // To reduce the array and make overall price to 2 decimal points
      const totalPrice = (accumulatedPrice, currentValue) =>
        accumulatedPrice + currentValue;
      const total = totalPriceArray.reduce(totalPrice).toFixed(2);

      const overallSubsidy = Object.keys(pricing).map(key => {
        let price = 50; //To test - would need to be against 'transactions[item].price' value in production
        let priceCutOff = pricing.discount_cutoff;
        if (priceCutOff > price) {
          return (
            <p value={[key]}>
              <span className="pricingSubsidy">{pricing.subsidy}</span>
            </p>
          );
        } else {
          return (
            <p value={[key]}>
              <span className="pricingSubsidy">{pricing.discount_subsidy}</span>
            </p>
          );
        }
      });

      //This is currently Incorrect, as it is a JSX Element, hence returning as NaN
      // const overallSubsidyToNumber = Number(overallSubsidy);

      const tableRows = Object.keys(transactions).map(key => {
        /*The date returned below is sliced to meet the desired format*/
        return (
          <tr>
            <td key={[key].description} value={[key].description}>
              {transactions[key].description}
            </td>
            <td key={[key].description} value={[key].description}>
              {transactions[key].date.slice(0, -14)} &nbsp;
              {transactions[key].date.slice(11, 16)}
            </td>
            <td key={[key].description} value={[key].description}>
              {transactions[key].price}
            </td>
            <td>{overallSubsidy[0]}</td>
          </tr>
        );
      });

      this.setState({
        merchantData,
        transactionsCount,
        transactions,
        tableRows,
        // overallSubsidyToNumber, //This is currently Incorrect, as it is a JSX Element, hence returning as NaN
        total
      });
    });
  }

  //The 'Subsidy' value currently returns as NaN, as 'overallSubsidyToNumber' is a JSX Element, not a number
  render() {
    return (
      <section>
        <HeaderTwo>Transactions</HeaderTwo>
        <h3>{this.state.merchantData.name}</h3>
        <div id="topLevelCounts">
          <h4>
            Count <span>{this.state.transactionsCount.length}</span>
          </h4>
          <h4>
            Total <span>{this.state.total}</span>
          </h4>
          <h4>
            Subsidy
            <span>
              {this.state.total -
                (this.state.total / 100) * this.state.overallSubsidyToNumber}
            </span>
          </h4>
        </div>

        <Table font="Arial">
          <thead>
            <tr>
              <th>Description</th>
              <th>Date</th>
              <th>Price (&pound;)</th>
              <th>Subsidy (&pound;)</th>
            </tr>
          </thead>
          <tbody>{this.state.tableRows}</tbody>
        </Table>
        <div />
      </section>
    );
  }
}
