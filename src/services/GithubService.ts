import type { Repo } from "../interfaces/models/repo";

export class GithubService {
  private baseUrl = "https://api.github.com";

  async getRepos(username: string): Promise<Repo[]> {
    const response = await fetch(`${this.baseUrl}/users/${username}/repos`);
    return response.json();
  }
}
