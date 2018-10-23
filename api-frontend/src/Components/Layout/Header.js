import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export default class Header extends Component {
  render() {
    return (
      <AppBar
        possition="fixed"
        style={{
          backgroundColor: "#5fcf80",
          padding: "10px 0",
          borderBottom: "2px solid #e5e5e5",
        }}
      >
      <Toolbar style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            <div className="header_logo">
              <h1>FSJS RestAPI 2.0</h1>
            </div>
          </div>
          <Link to="/signin">
            <Button color="inherit">Sign In</Button>
          </Link>
        </Toolbar>
      </AppBar>
    )
  }
}
