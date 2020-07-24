/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/first */

import React, { InputHTMLAttributes, HTMLProps } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import api from '../services/api';
import App from '../App';

const apiMock = new MockAdapter(api);

const wait = (amount = 0): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, amount));
};

const actWait = async (amount = 0): Promise<void> => {
  await act(async () => {
    await wait(amount);
  });
};

describe('<App />', () => {
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
      total: 30,
      page: 1,
      perPage: 5,
      lastPage: 6,
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
      target: { value: 'non exiting' },
    });

    await actWait(500);

    fireEvent.click(getByText('Pesquisar'));

    await actWait();

    expect(getByText('Usuário não encontrado')).toBeTruthy();
  });
});
