import api from '../infra/api';
import PaginateRepository from '../utils/PaginateRepository';
import AppError from '../errors/AppError';
import IListRepositoriesByUsername from '../interfaces/IListRepositoriesByUsername';

class ListRepositoriesByUsernameService {
  public async execute({
    username,
    page,
    perPage,
  }: IListRepositoriesByUsername) {
    try {
      const { data } = await api.get(`/users/${username}/repos`);
      const paginateRepository = PaginateRepository(data, page, perPage);

      return paginateRepository;
    } catch (error) {
      if (error.response.status === 404) {
        throw new AppError('Usuário não encontrado', 404);
      }
      throw new Error();
    }
  }
}

export default ListRepositoriesByUsernameService;
