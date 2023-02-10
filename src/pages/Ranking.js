import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  returnLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
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
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
