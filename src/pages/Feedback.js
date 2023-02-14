import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  handleClick = ({ target: { name } }) => {
    const { history } = this.props;
    switch (name) {
    case 'playAgain':
      history.push('/');
      break;

    case 'ranking':
      history.push('/ranking');
      break;
    default:
      history.push('/not-found');
    }
  };

  render() {
    return (
      <div>
        <Header />
        <p
          data-testid="feedback-text"
        >
          Feedback Text
        </p>
        <button
          type="button"
          name="playAgain"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          name="ranking"
          onClick={ this.handleClick }
        >
          Ranking
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
