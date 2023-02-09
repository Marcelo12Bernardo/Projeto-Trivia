import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import React from 'react'
import { screen } from '@testing-library/react';
import Login from '../pages/Login'
import App from '../App'

const BTN_PLAY ='btn-play'

describe ('Testa a página Login', () => {
  it('Testa se a página login é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const playButton = screen.getByTestId(BTN_PLAY)
    const settingsButton = screen.getByTestId('btn-settings')
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const inputName = screen.getByTestId('input-player-name')

    expect(playButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
  });
  it('Verifica se o botão inicia desabilitado, e habilita após a verificação', () => {
    renderWithRouterAndRedux(<App />);
    const playButton = screen.getByTestId(BTN_PLAY)

    expect(playButton).toBeDisabled();
    
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const inputName = screen.getByTestId('input-player-name')

    userEvent.type(inputEmail, 'teste@teste.com')
    userEvent.type(inputName, 'Fulano da Silva')

    expect(playButton).toBeEnabled();
  });
  it('Verifica se ao clicar no botão Play, rendireciona para a rota Game', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const playButton = screen.getByTestId(BTN_PLAY)    
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const inputName = screen.getByTestId('input-player-name')

    userEvent.type(inputEmail, 'teste@teste.com')
    userEvent.type(inputName, 'Fulano da Silva')
    
    userEvent.click(playButton)

    const { pathname } = history.location

    expect(pathname).toBe('/game')

  })
  it('Verifica se ao clicar no botão Settings, rendireciona para a rota Settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByTestId('btn-settings')

    userEvent.click(settingsButton)

    const { pathname } = history.location

    expect(pathname).toBe('/settings')
  })

  it('Verifica se caso chamar a função handleClick retorna um erro', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const fakeButton = screen.getByTestId('btn-settings')

    fakeButton.name = 'undefined'

    userEvent.click(fakeButton)

    const { pathname } = history.location

    expect(pathname).toBe('/not-found')
  })
});