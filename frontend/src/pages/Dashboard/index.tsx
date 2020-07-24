import React, { useState, FormEvent } from 'react';
import {
  FiChevronRight,
  FiEye,
  FiStar,
  FiSettings,
  FiCircle,
} from 'react-icons/fi';

import { Title, Form, Repositories, Error } from './styles';

import Paginate from '../../components/Paginate';
import RowLeft from '../../components/RowLeft';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import IPaginateRepository from '../../interfaces/IPaginateRepository';

const Dashboard: React.FC = () => {
  const [newUser, setNewUser] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [inputError, setInputError] = useState('');
  const [loadingInput, setLoadingInput] = useState(false);
  const [repositories, setRepositories] = useState<IPaginateRepository | null>(
    null,
  );

  async function handleAddRepository(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    setLoadingInput(true);
    if (!newUser) {
      setInputError('Digite o username do Usuário');
      return;
    }

    try {
      const res = await api.get(`/users/${newUser}/repos`);
      setRepositories(res.data);
      setCurrentUser(newUser);
      setNewUser('');
      setInputError('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setInputError('Usuário não encontrado');
        return;
      }
      setInputError('Por favor tente novamente mais tarde!');
    }
    setLoadingInput(false);
  }

  async function handleLoadNewPage(newPage: number): Promise<void> {
    setLoadingInput(true);
    try {
      const res = await api.get(`/users/${currentUser}/repos?page=${newPage}`);
      setRepositories(res.data);
    } catch (error) {
      setInputError('Algo de errado aconteceu.');
    }
    setLoadingInput(false);
  }

  return (
    <>
      <img src={logoImg} alt="logo" />
      <Title>Explore Repositórios no Github</Title>

      <Form hasError={!!inputError} action="" onSubmit={handleAddRepository}>
        <input
          type="text"
          value={newUser}
          aria-label="cost-input"
          onChange={e => setNewUser(e.target.value)}
          placeholder="Digite o username do Usuário"
        />
        <button disabled={loadingInput} type="submit">
          {loadingInput ? `Carregando...` : `Pesquisar`}
        </button>
      </Form>
      {inputError && <Error>{inputError}</Error>}

      <Repositories data-testid="repository-list">
        {loadingInput && <h2>Carregando ...</h2>}

        {repositories && repositories.data.length === 0 ? (
          <h2>Nenhum Repositório Encontrado</h2>
        ) : (
          ''
        )}

        {repositories &&
          !loadingInput &&
          repositories.data.map(repository => (
            <a
              key={repository.id}
              href={repository.html_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
                <div>
                  {repository.language && (
                    <span title="Language">
                      <FiCircle size={15} />
                      {repository.language}
                    </span>
                  )}
                  <span title="Starts">
                    <FiStar size={15} />
                    {repository.stargazers_count}
                  </span>
                  <span title="Watched">
                    <FiEye size={15} />
                    {repository.watchers_count}
                  </span>
                  <span title="Issues">
                    <FiSettings size={15} />
                    {repository.open_issues_count}
                  </span>
                </div>
              </div>
              <FiChevronRight size={20} />
            </a>
          ))}

        {repositories && !loadingInput && (
          <RowLeft>
            <Paginate
              totalRow={repositories.total}
              currentPage={repositories.page}
              totalPage={repositories.lastPage}
              perPage={repositories.perPage}
              handleLoadNewPage={handleLoadNewPage}
            />
          </RowLeft>
        )}
      </Repositories>
    </>
  );
};

export default Dashboard;
