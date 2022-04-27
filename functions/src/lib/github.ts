import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import ja from "dayjs/locale/ja";
import * as functions from "firebase-functions";

import { GitHubAPIResponse, ContributionWeek, ContributionDay } from "../types";

dayjs.locale(ja);

const GITHUB_READ_USER_TOKEN = functions.config().github.read_user_token;
const GITHUB_USER = "x7ddf74479jn5";

const query = `
query ($userName: String!,$date: DateTime!) {
  user(login: $userName) {
    contributionsCollection(from: $date, to: $date) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
          }
        }
      }
    }
  }
}
`;

const getVariables = (date: Dayjs) => {
  return `{
  "userName": ${GITHUB_USER},
  "date": "${date.toISOString()}"
}
`;
};

const url = "https://api.github.com/graphql";
const yesterday = dayjs().subtract(1, "day");
const json = { query, variables: getVariables(yesterday) };

export const getContributionWeek = async (): Promise<ContributionWeek> => {
  const got = await (await import("got")).default;
  const { data }: GitHubAPIResponse = await got
    .post(url, {
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