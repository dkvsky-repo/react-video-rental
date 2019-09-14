import React, { Component } from 'react';
import Input from './common/Input';

export default class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    errors: {}
  };

  // Super basic validation. This will be improved.
  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === '') {
      errors.username = 'Username is required.';
    }
    if (account.password.trim() === '') {
      errors.password = 'Password is required.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;
    // call server
    console.log('submitted');
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <p className="lead">(Coming soon!)</p>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
