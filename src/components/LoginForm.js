import React, { Component } from 'react';
import Joi from '@hapi/joi';
import Input from './common/Input';

export default class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    errors: {}
  };

  // schema = Joi.object({
  //   username: Joi.string()
  //     .required()
  //     .label('Username'),
  //   password: Joi.string()
  //     .required()
  //     .label('Password')
  // });

  usernameSchema = Joi.object({
    username: Joi.string()
      .required()
      .label('Username')
  });

  passwordSchema = Joi.object({
    password: Joi.string()
      .required()
      .label('Password')
  });

  combinedSchema = this.usernameSchema.concat(this.passwordSchema);

  validate = () => {
    const { username, password } = this.state.account;
    const options = { abortEarly: false };
    const { error } = this.combinedSchema.validate(
      {
        username: username,
        password: password
      },
      options
    );

    if (!error) return null;
    // map Joi errors into errors object
    const errors = {};
    error.details.map(item => {
      // Save input name and its error message value
      // based on return from Joi validation.
      return (errors[item.path[0]] = item.message);
    });
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const { error } =
      name === 'username'
        ? this.usernameSchema.validate({ [name]: value })
        : this.passwordSchema.validate({ [name]: value });

    return error ? error.details[0].message : null;
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
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors });
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
