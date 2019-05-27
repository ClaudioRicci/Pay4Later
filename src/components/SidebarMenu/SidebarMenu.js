import React, { Component } from "react";
import { Link } from "react-router-dom"; //Imported but not used, would do so to link navigation in production
//import { BrowserRouter, Route, NavLink, Link } from "react-router-dom"; // Imported but not used, would do so to link navigation in production
import axios from "axios"; // For Cross Browser supported Ajax requests
import HeaderTwo from "./../HeaderTwo/HeaderTwo"; // To illustrate use of 'Styled-Components', which contains components CSS
import ListItem from "./../ListItem/ListItem"; // To illustrate use of 'Styled-Components', which contains components CSS

export default class SidebarMenu extends Component {
  state = {
    merchants: []
  };

  componentDidMount() {
    axios
      .get(
        `http://interview.dekopay.com.s3.eu-west-2.amazonaws.com/merchants.json`
      )
      .then(res => {
        const merchants = res.data;
        this.setState({ merchants });
      });
  }

  render() {
    return (
      <React.Fragment>
        <nav>
          <HeaderTwo>Merchants</HeaderTwo>
          <ul>
            {this.state.merchants.map(merchant => (
              <ListItem>
                <Link
                  key={merchant.merchant_id}
                  to={`${merchant._links.self.href.slice(0, -5)}/`}
                >
                  {merchant.name} <span>&gt;</span>
                </Link>
              </ListItem>
            ))}
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}
