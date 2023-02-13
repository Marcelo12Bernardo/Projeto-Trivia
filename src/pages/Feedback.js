import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <Header />

        <button
          type="button"
          data-destid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
      </div>

    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Feedback;
