import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getScore, getAssertions } from '../redux/actions';
import Timer from './Timer';

class ForQuestions extends React.Component {
  state = {
    answersSuffled: [],
    seconds: 30,
    isDisabled: false,
    isAnswered: false,
    timer: true,
  };

  componentDidMount() {
    this.shuffle();
  }

  revealColor = ({ target: { name } }) => {
    const { dispatch } = this.props;
    const { seconds } = this.state;
    dispatch(getScore(this.finishedQuestion(seconds, name)));
    this.finishTime();
  };

  finishTime = () => {
    const { isAnswered } = this.state;
    if (!isAnswered) {
      this.setState({
        isDisabled: true,
        isAnswered: true,
      });
    }
  };

  finishedQuestion = (seconds, name) => {
    const { difficulty, dispatch } = this.props;
    const TEN = 10;
    const TIMER = seconds;
    const EASY_VALUE = 1;
    const MEDIUM_VALUE = 2;
    const HARD_VALUE = 3;

    if (name === 'correctAnswer') {
      dispatch(getAssertions(1));
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
    } else {
      return 0;
    }
  };

  getSeconds = (seconds) => {
    const { isAnswered } = this.state;
    if (!isAnswered) {
      this.setState({
        seconds,
      });
    }
  };

  nextQuestion = () => {
    const { nextQuestion } = this.props;
    nextQuestion();
    this.setState({
      isAnswered: false,
      isDisabled: false,
      timer: false,
    });
    setTimeout(() => {
      this.shuffle();
    });
  };

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
      timer: true,
    });
  };

  render() {
    const { question, category, correctAnswer,
      difficulty } = this.props;
    const { answersSuffled, isDisabled, isAnswered, timer } = this.state;
    return (
      <div>
        { difficulty }
        { timer
        && <Timer
          isAnswered={ isAnswered }
          getSeconds={ this.getSeconds }
          finishTime={ this.finishTime }
        />}
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
                name={ (answer.includes(correctAnswer)
                  ? 'correctAnswer'
                  : 'wrongAnswer') }
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
          { isAnswered
          && (
            <button
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              Next
            </button>)}
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
