interface IRepository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  full_name: string;
  language: string;
  watchers_count: number;
  open_issues_count: number;
  stargazers_count: number;
  owner: {
    avatar_url: string;
    login: string;
  };
}

export default IRepository;
