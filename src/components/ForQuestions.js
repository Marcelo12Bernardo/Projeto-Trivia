import PropTypes from 'prop-types';
import React from 'react';

class ForQuestions extends React.Component {
  state = {
    answersSuffled: [],
    isAnswered: false,
  };

  componentDidMount() {
    this.shuffle();
  }

  revealColor = () => {
    this.setState({
      isAnswered: true,
    });
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
    const { question, category, correctAnswer } = this.props;
    const { answersSuffled, isAnswered } = this.state;
    return (
      <div>
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

export default ForQuestions;
