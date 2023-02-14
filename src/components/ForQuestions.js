import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getScore } from '../redux/actions';
import Timer from './Timer';

class ForQuestions extends React.Component {
  state = {
    answersSuffled: [],
    seconds: 30,
    isDisabled: false,
    isAnswered: false,
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
    const { difficulty } = this.props;
    const TEN = 10;
    const TIMER = seconds;
    const EASY_VALUE = 1;
    const MEDIUM_VALUE = 2;
    const HARD_VALUE = 3;

    if (name === 'correctAnswer') {
      console.log(TEN, TIMER, difficulty);
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
    const { question, category, correctAnswer,
      difficulty } = this.props;
    const { answersSuffled, isDisabled, isAnswered } = this.state;
    return (
      <div>
        { difficulty }
        <Timer
          isAnswered={ isAnswered }
          getSeconds={ this.getSeconds }
          finishTime={ this.finishTime }
        />
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
