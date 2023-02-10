import PropTypes from 'prop-types';
import React from 'react';

class ForQuestions extends React.Component {
  /*   state = {
      category: '',
      correct_answer: '',
      difficulty: '',
      incorrect_answers: [],
      question: '',
      type: '',
    }; */

  shufflyArr = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  isCorrect = (arr) => {
    const { correctAnswer, incorrectAnswer } = this.props;
    let forResult = `wrong-answer-${incorrectAnswer.indexOf(arr)}`;
    if (correctAnswer === arr) {
      forResult = 'correct-answer';
    }
    return forResult;
  };

  render() {
    const { correctAnswer, incorrectAnswer } = this.props;
    const alternatives = this.shufflyArr([correctAnswer, incorrectAnswer]);
    return (
      <div>
        {
          alternatives.map((textAnswer, index) => (
            <button
              data-testid={ this.isCorrect(textAnswer) }
              key={ index }
            >
              { textAnswer }
            </button>
          ))
        }
      </div>
    );
  }
}

ForQuestions.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswer: PropTypes.string.isRequired,
};

export default ForQuestions;
