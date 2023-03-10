import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchTokenAPI from '../services/fetchAPI';
import { getEmail, getName, resetState } from '../redux/actions';

class Login extends Component {
  state = {
    userName: '',
    email: '',
    isDisabled: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const emptyState = {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
    dispatch(resetState(emptyState));
  }

  handleClick = ({ target: { name } }) => {
    const { history, dispatch } = this.props;
    const { email, userName } = this.state;

    switch (name) {
    case 'playButton':
      dispatch(getEmail(email));
      dispatch(getName(userName));
      this.saveToken();
      break;
    case 'settingsButton':
      history.push('/settings');
      break;
    default:
      history.push('/not-found');
    }
  };

  saveToken = async () => {
    const { history } = this.props;
    const token = await fetchTokenAPI();
    localStorage.setItem('token', token);
    history.push('/game');
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validate);
  };

  validate = () => {
    const { email, userName } = this.state;
    const minLengthName = 3;
    const nameValidate = userName.length >= minLengthName;
    const emailValidate = (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(email);
    this.setState({ isDisabled: !(nameValidate && emailValidate) });
  };

  render() {
    const { email, userName, isDisabled } = this.state;
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
            value={ userName }
            name="userName"
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
