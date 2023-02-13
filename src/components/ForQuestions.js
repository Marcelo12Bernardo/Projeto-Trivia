import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getScore } from '../redux/actions';

class ForQuestions extends React.Component {
  state = {
    answersSuffled: [],
    isAnswered: false,
  };

  componentDidMount() {
    this.shuffle();
  }

  revealColor = () => {
    const { dispatch, finishTime, seconds } = this.props;
    this.setState({
      isAnswered: true,
    }, () => dispatch(getScore(this.finishedQuestion(seconds))));
    finishTime();
  };

  finishedQuestion = (seconds) => {
    const { difficulty } = this.props;
    const TEN = 10;
    const TIMER = seconds;
    const EASY_VALUE = 1;
    const MEDIUM_VALUE = 2;
    const HARD_VALUE = 3;

    /*     if (difficulty === 'easy') {
      const result = TEN + TIMER * EASY_VALUE;
      return result;
    }
    if (difficulty === 'medium') {
      const result = TEN + TIMER * MEDIUM_VALUE;
      return result;
    }
    if (difficulty === 'hard') {
      const result = TEN + TIMER * HARD_VALUE;
      return result;
    }
  }; */
  /*    console.log(TIMER); */
    switch (difficulty) {
    case 'easy':
      return (TEN + (TIMER * EASY_VALUE));
    case 'medium':
      return (TEN + (TIMER * MEDIUM_VALUE));
    case 'hard':
      return (TEN + (TIMER * HARD_VALUE));
    default:
      break;
    }
  };
  // const { nextQuestion } = this.props;
  // setTimeout(() => {
  //   nextQuestion();
  //   setTimeout(() => {
  //     this.shuffle();
  //   });
  // }, '2500');

  shuffle = () => {
    const { answers } = this.props;
    for (let i = answers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = answers[i];
      answers[i] = answers[j];
      answers[j] = temp;
    }
    return this.setState({
      answersSuffled: answers,
    });
  };

  render() {
    const { question, category, correctAnswer, isDisabled, difficulty } = this.props;
    const { answersSuffled, isAnswered } = this.state;
    return (
      <div>
        { difficulty }
        <p
          data-testid="question-category"
        >
          { category }
        </p>
        <p
          data-testid="question-text"
        >
          { question }
        </p>
        <div
          data-testid="answer-options"
        >
          {
            answersSuffled.map((answer, index) => (
              <button
                key={ index }
                onClick={ this.revealColor }
                className={ isAnswered && (answer.includes(correctAnswer)
                  ? 'correctButton'
                  : 'wrongButton') }
                data-testid={ answer.includes(correctAnswer)
                  ? 'correct-answer'
                  : `wrong-answer-${index}` }
                disabled={ isDisabled }
              >
                { answer }
              </button>
            ))
          }
        </div>
      </div>
    );
  }
}

ForQuestions.propTypes = {
  correctAnswer: PropTypes.string,
  incorrectAnswer: PropTypes.string,
  answers: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default connect()(ForQuestions);
