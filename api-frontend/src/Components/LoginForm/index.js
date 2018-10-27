import React, { Component } from 'react'

export default class LoginForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      emailAddress: '',
      password: '' 
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log(`Email: ${this.state.emailAddress} Password: ${this.state.password}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email Address:
          <input id="emailAddress" type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
