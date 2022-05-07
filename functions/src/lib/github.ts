import dayjs from "./dayjs";
import type { Dayjs } from "./dayjs";
import got from "got";

import { GitHubAPIResponse, ContributionWeek, ContributionDay } from "../types";
import { GITHUB_USER, GITHUB_READ_USER_TOKEN, GITHUB_ENDPOINT } from "../constants";

const query = `
query ($userName: String!, $dateTime: DateTime!) {
  user(login: $userName) {
    contributionsCollection(from: $dateTime, to: $dateTime) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

const getVariables = (date: Dayjs) => {
  return `{
  "userName": "${GITHUB_USER}",
  "dateTime": "${date.format()}"
}
`;
};

const yesterday = dayjs().subtract(1, "day");
const json = { query, variables: getVariables(yesterday) };

export const getContributionWeek = async (): Promise<ContributionWeek> => {
  const { data }: GitHubAPIResponse = await got
    .post(GITHUB_ENDPOINT, {
      headers: { Authorization: `Bearer ${GITHUB_READ_USER_TOKEN}` },
      json,
    })
    .json();

  const { weeks } = data?.user?.contributionsCollection?.contributionCalendar;

  if (!weeks) {
    throw new Error("Could not get contributions data");
  }

  return weeks[0];
};

export const getContributionDay = (week: ContributionWeek): ContributionDay => {
  return week.contributionDays[0];
};

export const getContributionCountDay = (day: ContributionDay): number => {
  return day.contributionCount;
};
