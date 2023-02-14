import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import getGravatarEmail from '../services/md5Function';

class Ranking extends Component {
  returnLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <main>
        <h1 data-testid="ranking-title">
          Ranking Page
        </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.returnLogin }
        >
          Voltar ao Inicio
        </button>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Perfil</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {ranking && (ranking.map((element, index) => (
              <tr key={ index }>
                <td data-testid={ `player-name-${index}` }>{ element.name }</td>
                <td>
                  <img
                    src={ `https://www.gravatar.com/avatar/${getGravatarEmail(element.gravatarEmail)}` }
                    alt="imagem do jogador"
                  />
                </td>
                <td data-testid={ `player-score-${index}` }>{ element.score }</td>
              </tr>
            )))}
          </tbody>
        </table>

      </main>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  assertions: player.assertions,
  score: player.score,
  gravatarEmail: player.gravatarEmail,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  name: PropTypes.string,
  assertions: PropTypes.number,
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Ranking);
