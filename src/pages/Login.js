import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validate);
  };

  validate = () => {
    const { email, name } = this.state;
    const minLengthName = 3;
    const nameValidate = name.length >= minLengthName;
    const emailValidate = (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(email);
    this.setState({ isDisabled: !(nameValidate && emailValidate) });
  };

  render() {
    const { email, name, isDisabled } = this.state;
    return (
      <main>
        <form>
          <input
            type="email"
            value={ email }
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            value={ name }
            name="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ isDisabled }
            data-testid="btn-play"
          >
            Play
          </button>
        </form>
      </main>
    );
  }
}

export default connect()(Login);
