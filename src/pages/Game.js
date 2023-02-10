import React, { Component } from 'react';
import { connect } from 'react-redux';
import getGravatarEmail from '../services/md5Function';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const { email, name, score } = this.props;
    const getAvatar = getGravatarEmail(email);
    return (
      <div>
        <header>          
          <img
            src={`https://www.gravatar.com/avatar/${getAvatar}`}
            data-testid="header-profile-picture"
          />
          <div
            data-testid="header-player-name"
          >
            {`Nome: ${name}`}
          </div>
          <div
            data-testid="header-score"
          >
            {`Placar: ${score}`}
          </div>
        </header>
        <h1>
          Game Page
        </h1>
      </div>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}

const mapStateToProps = ({ player }) => ({
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
})

export default connect(mapStateToProps)(Game);
