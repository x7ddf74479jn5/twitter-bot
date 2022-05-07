import TwitterApi from "twitter-api-v2";
import { ContributionDay } from "../types";
import dayjs from "./dayjs";

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substr(0, maxLength) + "..." : text;
};

export const createTweetText = (contribution: ContributionDay): string => {
  const contentText = `
📅: ${dayjs(contribution.date).format("YYYY/MM/DD")}
➕: ${contribution.contributionCount} commits
`.trim();

  // The url will be a 30-character shortened URL, so the content will be truncate to 105 characters.
  return truncateText(contentText, 103);
};

export const tweetFromContribution = async (client: TwitterApi, contribution: ContributionDay): Promise<void> => {
  await client.v1.tweet(createTweetText(contribution));
};
