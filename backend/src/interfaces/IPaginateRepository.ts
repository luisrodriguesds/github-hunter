import IRepository from './IRepository';

interface IPaginateRepository {
  data: IRepository[];
  total: number;
  page: number;
  perPage: number;
  lastPage: number;
}

export default IPaginateRepository;
