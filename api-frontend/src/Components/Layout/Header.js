import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Zoom from 'react-reveal/Zoom';

export default class Header extends Component {
  render() {
    return (
      <AppBar
      possition="fixed"
      style={{
        backgroundColor: "#5fcf80",
        color: "#3e474f",
        padding: "10px 0",
        borderBottom: "2px solid #00285e"
      }}
      >
        <Toolbar style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <Zoom>
            <h1>Rest API Front-end</h1>
          </Zoom>
        </div>
          <Link to="/login">
            <Button color="inherit">login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    )
  }
}
