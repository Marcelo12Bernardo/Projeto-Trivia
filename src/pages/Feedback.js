import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  feedbackText = (assertions) => {
    const numberAssertions = 3;
    if (assertions < numberAssertions) {
      return 'Could be better...';
    }
    if (assertions >= numberAssertions) {
      return 'Well Done!';
    }
  };

  render() {
    const { assertions } = this.props;
    return (
      <div>
        <Header />
        <p
          data-testid="feedback-text"
        >
          { this.feedbackText(assertions) }

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
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
