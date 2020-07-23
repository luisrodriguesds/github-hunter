import IRepository from '../interfaces/IRepository';
import IPaginateRepository from '../interfaces/IPaginateRepository';

const PaginateRepository = (
  repositories: IRepository[],
  page: number,
  perPage: number,
): IPaginateRepository => {
  const newRepositories: IRepository[] = [];
  const totalPage = Math.ceil(repositories.length / perPage);
  let count = page * perPage - perPage;
  const delimiter = count + perPage;

  if (page <= totalPage) {
    for (let i = count; i < delimiter; i += 1) {
      if (repositories[i] != null) {
        newRepositories.push(repositories[i]);
      }
      count += 1;
    }
  }

  const res: IPaginateRepository = {
    data: newRepositories,
    total: repositories.length,
    page,
    perPage,
    lastPage: totalPage,
  };

  return res;
};

export default PaginateRepository;
