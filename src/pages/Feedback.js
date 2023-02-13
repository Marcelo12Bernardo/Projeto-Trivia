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
        {/* Necessita colocar o name: no botão de play again */}
        {/* Necessita apagar a função playAgain() */}
        <button
          type="button"
          data-destid="btn-play-ranking"
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
