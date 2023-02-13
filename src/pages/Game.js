import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import forQuestion from '../services/getQuestions';
import ForQuestions from '../components/ForQuestions';
import '../styles/Game.css';
import Timer from '../components/Timer';

class Game extends Component {
  state = {
    questions: [],
    indexQuestion: 0,
    isDisabled: false,
    seconds: 0,
  };

  componentDidMount() {
    this.getQuestions();
  }

  verifyToken = () => {
    const getToken = localStorage.getItem('token');
    const token = /^[A-Za-z0-9]{64}$/.test(getToken);
    if (!token) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  getSeconds = (seconds) => {
    this.setState({
      seconds,
    });
  };

  finishTime = () => {
    this.setState({
      isDisabled: true,
    });
  };

  nextQuestion = () => {
    const { indexQuestion } = this.state;
    const { history } = this.props;

    const maxQuestions = 4;

    this.setState({
      indexQuestion: indexQuestion + 1,
    });

    if (indexQuestion >= maxQuestions) {
      history.push('/feedback');
    }
  };

  getQuestions = async () => {
    const questions = await forQuestion();
    this.setState({
      questions,
    }, this.verifyToken());
  };

  render() {
    const { questions, indexQuestion, isDisabled, seconds } = this.state;
    return (
      questions.length === 0 ? <h1> Loading... </h1> : (
        <div>
          <Header />
          <h1>
            Game Page
          </h1>
          <Timer
            finishTime={ this.finishTime }
            getSeconds={ this.getSeconds }
          />
          { questions.length > 0

          && <ForQuestions
            seconds={ seconds }
            finishTime={ this.finishTime }
            difficulty={ questions[indexQuestion].difficulty }
            category={ questions[indexQuestion].category }
            correctAnswer={ questions[indexQuestion].correct_answer }
            answers={ [...questions[indexQuestion].incorrect_answers,
              questions[indexQuestion].correct_answer] }
            question={ questions[indexQuestion].question }
            isDisabled={ isDisabled }
            nextQuestion={ this.nextQuestion }
          />}
        </div>
      )
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
