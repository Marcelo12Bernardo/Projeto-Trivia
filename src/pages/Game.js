import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarEmail from '../services/md5Function';
import forQuestion from '../services/getQuestions';
import ForQuestions from '../components/ForQuestions';

class Game extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    const getQuestions = forQuestion();
    console.log(getQuestions);
    this.setState({ questions: getQuestions });
    const getToken = localStorage.getItem('token');
    if (!getToken) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  render() {
    const { questions } = this.state;
    const { email, name, score } = this.props;
    const getAvatar = getGravatarEmail(email);
    return (
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
        {questions.map((quest, index) => (
          <ForQuestions
            { ...quest }
            key={ index }
            correctAnswer={ quest.correct_answer }
            incorrectAnswers={ quest.incorrect_answers }
          />))}
      </div>
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
