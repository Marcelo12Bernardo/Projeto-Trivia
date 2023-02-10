import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchTokenAPI from '../services/fetchAPI';
import { getEmail, getName } from '../redux/actions';
import md5 from 'crypto-js/md5';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  handleClick = ({ target: { name } }) => {
    const { history, dispatch } = this.props;
    // arrayObject = [{
      //   name,
      //   score,
      //   picture,
      // }]
      // localStorage.setItem(ranking, arrayObject )
      
      
    if (name === 'playButton') {
      const { email, name } = this.state;    
      dispatch(getEmail(email));
      dispatch(getName(name));
      this.saveToken();
      history.push('/game');
    } else if (name === 'settingsButton') {
      history.push('/settings');
    }
  };

  saveToken = async () => {
    const token = await fetchTokenAPI();
    localStorage.setItem('token', token.token);
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
            name="playButton"
            disabled={ isDisabled }
            onClick={ this.handleClick }
            data-testid="btn-play"
          >
            Play
          </button>
          <button
            type="button"
            name="settingsButton"
            data-testid="btn-settings"
            onClick={ this.handleClick }
          >
            Settings
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
