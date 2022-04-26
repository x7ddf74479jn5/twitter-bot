export interface ContributionDay {
  contributionCount: number;
  contributionLevel?: string;
  date: string;
  color?: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface GitHubAPIResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    };
  };
}
