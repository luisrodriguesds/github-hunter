import { Router } from 'express';
import ListRepositoriesController from '../controllers/ListRepositoriesController';

const routes = Router();
const listRepositoriesController = new ListRepositoriesController();

routes.get('/users/:username/repos', listRepositoriesController.byUsername);

export default routes;
