import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  handleClick = ({ target: { name } }) => {
    const { history } = this.props;
    this.saveRanking();
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

  saveRanking = () => {
    const { name, assertions, score, gravatarEmail } = this.props;
    const rankingObj = { name, assertions, score, gravatarEmail };
    const initialRanking = JSON.parse(localStorage.getItem('ranking'));
    if (initialRanking === null) {
      localStorage.setItem('ranking', JSON.stringify([rankingObj]));
      return '';
    }
    const newRanking = [...initialRanking, rankingObj];
    const sortedRanking = newRanking.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(sortedRanking));
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
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <p
          data-testid="feedback-text"
        >
          { this.feedbackText(assertions) }

        </p>
        <p
          data-testid="feedback-total-score"
        >
          { score }
        </p>
        <p
          data-testid="feedback-total-question"
        >
          { assertions }
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
          onClick={
            // this.saveRanking
            this.handleClick
          }
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
  name: PropTypes.string,
  assertions: PropTypes.number,
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  name: player.name,
  assertions: player.assertions,
  score: player.score,
  gravatarEmail: player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
