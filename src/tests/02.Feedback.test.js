import userEvent from '@testing-library/user-event';
import { fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import React from 'react'
import { screen } from '@testing-library/react';
import Login from '../pages/Login'
import App from '../App'
import { waitFor } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import { act } from 'react-dom/test-utils';
import { wait } from '@testing-library/user-event/dist/utils';

const BTN_PLAY ='btn-play'

describe('Testes da página de Feedback', () => {
  it('', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const playButton = screen.getByText('Play');
    expect(playButton).toBeInTheDocument();
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();

    userEvent.type(inputEmail, 'teste@teste.com')
    userEvent.type(inputName, 'Fulano da Silva')
    fireEvent.click(playButton);

    await waitFor(() => {
      const { pathname } = history.location

      expect(pathname).toBe('/game')
    });

    let correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    let nextButton = await screen.findByText('Next');
    userEvent.click(nextButton);

    correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    nextButton = await screen.findByText('Next');
    userEvent.click(nextButton);

    correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    nextButton = await screen.findByText('Next');
    userEvent.click(nextButton);

    correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    nextButton = await screen.findByText('Next');
    userEvent.click(nextButton);

    correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    nextButton = await screen.findByText('Next');
    userEvent.click(nextButton);


    const playAgainButton = screen.getByTestId('btn-play-again');
    const rankingButton = screen.getByTestId('btn-ranking');

    expect(playAgainButton).toBeInTheDocument();
    expect(rankingButton).toBeInTheDocument();

    let { pathname } = history.location

    expect(pathname).toBe('/feedback');

    userEvent.click(playAgainButton);

    await waitFor(() => {
      const { pathname } = history.location

      expect(pathname).toBe('/')
    });
  });

  it('Testa se a pagina contem um header com o nome do jogador', () => {
    renderWithRouterAndRedux(<Feedback />);
    const name = screen.getByTestId('header-player-name');
    expect(name).toBeInTheDocument();
  });

  it('Testa se a pagina contem um elemento com a pontuação do jogador', () => {
    renderWithRouterAndRedux(<Feedback />);
    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();
  });

  it('Testa se a pagina contem um elemento com a imagem do jogador', () => {
    renderWithRouterAndRedux(<Feedback />);
    const imgGravatar = screen.getByTestId('header-profile-picture');
    expect(imgGravatar).toBeInTheDocument();
  });

  it('Testa se a pagina contem um button Play Again', () => {
    renderWithRouterAndRedux(<Feedback />);
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument();
  });

  it('Testa se a pagina contem um button Play Ranking', () => {
    renderWithRouterAndRedux(<Feedback />);
    const btnPlayAgain = screen.getByTestId('btn-ranking');
    expect(btnPlayAgain).toBeInTheDocument();
  });

  it('Clicar no botão play Again leva a pagina inicial', async() => {
 
    const { history } = renderWithRouterAndRedux(<App />);
    act (() => {
      history.push('/feedback');
    })
    const playAgainButton = await screen.findByTestId('btn-play-again');
    userEvent.click(playAgainButton);

    await waitFor(() => {
      const { pathname } = history.location

      expect(pathname).toBe('/')
    });
  });

  it('Clicar no botão ranking leva a pagina Ranking', async() => {
 
    const { history } = renderWithRouterAndRedux(<App />);
    act (() => {
      history.push('/feedback');
    })
    const rankingButton = await screen.findByTestId('btn-ranking');
    userEvent.click(rankingButton);

    await waitFor(() => {
      const { pathname } = history.location

      expect(pathname).toBe('/ranking')
    });
  });

  it('', () => {

  });
  it('', () => {

  });
});