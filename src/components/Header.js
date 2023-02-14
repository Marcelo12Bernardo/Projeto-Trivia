import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarEmail from '../services/md5Function';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const getAvatar = getGravatarEmail(email);
    return (

      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${getAvatar}` }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-player-name"
        >
          {`Nome: ${name}`}
        </p>
        <p
          data-testid="header-score"
        >
          {score}
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
