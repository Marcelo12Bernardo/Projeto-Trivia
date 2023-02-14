import userEvent from '@testing-library/user-event';
import { fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import React from 'react'
import { screen } from '@testing-library/react';
import Login from '../pages/Login'
import App from '../App'
import { waitFor } from '@testing-library/react';
import Feedback from '../pages/Feedback';

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
  it('', () => {
    // renderWithRouterAndRedux(<Feedback />);

  });
  it('', () => {

  });
  it('', () => {

  });
  it('', () => {

  });
});