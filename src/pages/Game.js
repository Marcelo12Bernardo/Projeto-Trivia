import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarEmail from '../services/md5Function';
import forQuestion from '../services/getQuestions';
import ForQuestions from '../components/ForQuestions';
import '../styles/Game.css';

class Game extends Component {
  state = {
    questions: [],
    indexQuestion: 0,
  };

  componentDidMount() {
    // this.verifyToken();
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
    const { questions, indexQuestion } = this.state;
    const { email, name, score } = this.props;
    const getAvatar = getGravatarEmail(email);
    return (
      questions.length === 0 ? <h1> Loading... </h1> : (
        <div>
          <header>
            <img
              src={ `https://www.gravatar.com/avatar/${getAvatar}` }
              alt="avatar"
              data-testid="header-profile-picture"
            />
            <div
              data-testid="header-player-name"
            >
              {`Nome: ${name}`}
            </div>
            <div
              data-testid="header-score"
            >
              {`Placar: ${score}`}
            </div>
          </header>
          <h1>
            Game Page
          </h1>

          { questions.length > 0

          && <ForQuestions
            category={ questions[indexQuestion].category }
            correctAnswer={ questions[indexQuestion].correct_answer }
            // incorrectAnswers={ questions[indexQuestion].incorrect_answers }
            answers={ [...questions[indexQuestion].incorrect_answers,
              questions[indexQuestion].correct_answer] }
            question={ questions[indexQuestion].question }
            nextQuestion={ this.nextQuestion }
          />}

          {/* { questions.length > 0 && questions.map((quest, index) => (
          <ForQuestions
            key={ index }
            category={ quest.category }
            correctAnswer={ quest.correct_answer }
            answers={ [...quest.incorrect_answers, quest.correct_answer] }
            question={ quest.question }
          />
        ))} */}
        </div>
      )
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ player }) => ({
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

export default connect(mapStateToProps)(Game);
