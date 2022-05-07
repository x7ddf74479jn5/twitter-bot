import TwitterApi from "twitter-api-v2";
import { ContributionDay } from "../lib/github/contribution";
import dayjs from "./dayjs";
import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_SECRET,
} from "../constants";

export const twitterClient = new TwitterApi({
  appKey: TWITTER_CONSUMER_KEY,
  appSecret: TWITTER_CONSUMER_SECRET,
  accessToken: TWITTER_ACCESS_TOKEN,
  accessSecret: TWITTER_ACCESS_SECRET,
});

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
