import { Request, Response } from 'express';
import ListRepositoriesByUsernameService from '../services/ListRepositoriesByUsernameService';

class ListRepositoriesController {
  public async byUsername(request: Request, response: Response) {
    const { username } = request.params;
    let { page = 1, perPage = 5 } = request.query;

    page = Number(page) ? Number(page) : 1;
    perPage = Number(perPage) ? Number(perPage) : 5;

    const listRepositoriesByUsernameService = new ListRepositoriesByUsernameService();
    const paginateRepository = await listRepositoriesByUsernameService.execute({
      username,
      page,
      perPage,
    });

    return response.status(200).json(paginateRepository);
  }
}

export default ListRepositoriesController;
