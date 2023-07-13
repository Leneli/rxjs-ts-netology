export const API_ENDPOINT = {
  GET_GITHUB: (query?: string) => `https://api.github.com/search/repositories?q=${query}`,
  GET_GITLAB: (query?: string) => `https://gitlab.com/api/v4/projects?search=${query}`,
};
