/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/first */

import React, { InputHTMLAttributes, HTMLProps } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import api from '../services/api';
import App from '../App';

let apiMock = new MockAdapter(api);

const wait = (amount = 0): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, amount));
};

const actWait = async (amount = 0): Promise<void> => {
  await act(async () => {
    await wait(amount);
  });
};

describe('<App />', () => {
  beforeEach(() => {
    apiMock = new MockAdapter(api);
  });

  it('should be able to search for a username', async () => {
    const { getByLabelText, getByText, getByTestId } = render(<App />);

    await actWait(500);

    fireEvent.change(getByLabelText('cost-input'), {
      target: { value: 'luisrodriguesds' },
    });

    await actWait(500);

    apiMock.onGet('/users/luisrodriguesds/repos').reply(200, {
      data: [
        {
          id: '1',
          html_url: 'https://github.com/luisrodriguesds/01-go-stack',
          description: 'Conceitos de nodejs - GoStack Bootcamp',
          full_name: 'luisrodriguesds/01-go-stack',
          language: 'JavaScript',
          watchers_count: 1,
          open_issues_count: 1,
          stargazers_count: 1,
          owner: {
            avatar_url: 'https://avatars0.githubusercontent.com/u/42545036?v=4',
            login: 'luisrodriguesds',
          },
        },
      ],
      total: 1,
      page: 1,
      perPage: 5,
      lastPage: 1,
    });

    await actWait(500);

    fireEvent.click(getByText('Pesquisar'));

    await actWait();

    expect(getByTestId('repository-list')).toContainElement(
      getByText('luisrodriguesds/01-go-stack'),
    );
  });

  it('should not be able to search for a empty username', async () => {
    const { getByText } = render(<App />);

    await actWait(500);

    fireEvent.click(getByText('Pesquisar'));

    await actWait();

    expect(getByText('Digite o username do Usuário')).toBeTruthy();
  });

  it('should not be able to search for a non-existing username', async () => {
    const { getByLabelText, getByText } = render(<App />);

    await actWait(500);

    fireEvent.change(getByLabelText('cost-input'), {
      target: { value: 'luisrodriguesds' },
    });

    await actWait(500);

    apiMock.onGet('/users/luisrodriguesds/repos').reply(404);

    await actWait(500);

    fireEvent.click(getByText('Pesquisar'));

    await actWait();

    expect(getByText('Usuário não encontrado')).toBeTruthy();
  });

  it('should be able to show a mensage when there is no repository', async () => {
    const { getByLabelText, getByText } = render(<App />);

    await actWait(500);

    fireEvent.change(getByLabelText('cost-input'), {
      target: { value: 'luisrodriguesds' },
    });

    await actWait(500);

    apiMock.onGet('/users/luisrodriguesds/repos').reply(200, {
      data: [],
      total: 0,
      page: 1,
      perPage: 5,
      lastPage: 1,
    });

    await actWait(500);

    fireEvent.click(getByText('Pesquisar'));

    await actWait();

    expect(getByText('Nenhum Repositório Encontrado')).toBeTruthy();
  });

  it('should be able to show a mensage when server is down', async () => {
    const { getByLabelText, getByText } = render(<App />);

    await actWait(500);

    fireEvent.change(getByLabelText('cost-input'), {
      target: { value: 'luisrodriguesds' },
    });

    await actWait(500);

    apiMock.onGet('/users/luisrodriguesds/repos').reply(500);

    await actWait(500);

    fireEvent.click(getByText('Pesquisar'));

    await actWait();

    expect(getByText('Por favor tente novamente mais tarde!')).toBeTruthy();
  });

  it('should be able to go to the next page', async () => {
    const { getByLabelText, getByText, getByTestId } = render(<App />);

    await actWait(500);

    fireEvent.change(getByLabelText('cost-input'), {
      target: { value: 'luisrodriguesds' },
    });

    await actWait(500);

    apiMock.onGet('/users/luisrodriguesds/repos').reply(200, {
      data: [
        {
          id: '1',
          html_url: 'https://github.com/luisrodriguesds/repo-1',
          description: 'description repo 1',
          full_name: 'luisrodriguesds/repo-1',
          language: 'JavaScript',
          watchers_count: 1,
          open_issues_count: 1,
          stargazers_count: 1,
          owner: {
            avatar_url: 'https://avatars0.githubusercontent.com/u/42545036?v=4',
            login: 'luisrodriguesds',
          },
        },
        {
          id: '2',
          html_url: 'https://github.com/luisrodriguesds/repo-2',
          description: 'description repo 2',
          full_name: 'luisrodriguesds/repo-2',
          language: 'JavaScript',
          watchers_count: 1,
          open_issues_count: 1,
          stargazers_count: 1,
          owner: {
            avatar_url: 'https://avatars0.githubusercontent.com/u/42545036?v=4',
            login: 'luisrodriguesds',
          },
        },
        {
          id: '3',
          html_url: 'https://github.com/luisrodriguesds/repo-3',
          description: 'description repo 3',
          full_name: 'luisrodriguesds/repo-3',
          language: 'JavaScript',
          watchers_count: 1,
          open_issues_count: 1,
          stargazers_count: 1,
          owner: {
            avatar_url: 'https://avatars0.githubusercontent.com/u/42545036?v=4',
            login: 'luisrodriguesds',
          },
        },
        {
          id: '4',
          html_url: 'https://github.com/luisrodriguesds/repo-4',
          description: 'description repo 4',
          full_name: 'luisrodriguesds/repo-4',
          language: 'JavaScript',
          watchers_count: 1,
          open_issues_count: 1,
          stargazers_count: 1,
          owner: {
            avatar_url: 'https://avatars0.githubusercontent.com/u/42545036?v=4',
            login: 'luisrodriguesds',
          },
        },
        {
          id: '5',
          html_url: 'https://github.com/luisrodriguesds/repo-5',
          description: 'description repo 5',
          full_name: 'luisrodriguesds/repo-5',
          language: 'JavaScript',
          watchers_count: 1,
          open_issues_count: 1,
          stargazers_count: 1,
          owner: {
            avatar_url: 'https://avatars0.githubusercontent.com/u/42545036?v=4',
            login: 'luisrodriguesds',
          },
        },
      ],
      total: 6,
      page: 1,
      perPage: 5,
      lastPage: 2,
    });

    await actWait(500);

    fireEvent.click(getByText('Pesquisar'));

    await actWait(500);

    apiMock.onGet('/users/luisrodriguesds/repos?page=2').reply(200, {
      data: [
        {
          id: '6',
          html_url: 'https://github.com/luisrodriguesds/repo-6',
          description: 'description repo 6',
          full_name: 'luisrodriguesds/repo-6',
          language: 'JavaScript',
          watchers_count: 1,
          open_issues_count: 1,
          stargazers_count: 1,
          owner: {
            avatar_url: 'https://avatars0.githubusercontent.com/u/42545036?v=4',
            login: 'luisrodriguesds',
          },
        },
      ],
      total: 6,
      page: 2,
      perPage: 5,
      lastPage: 2,
    });

    await actWait(500);

    fireEvent.click(getByTestId('page-2'));

    await actWait();

    expect(getByText('luisrodriguesds/repo-6')).toBeTruthy();
  });
});
