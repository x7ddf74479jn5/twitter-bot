import { shouldTweet } from "../lib/utils";
import { twitterClient, tweet, truncateText } from "../lib/twitter";
import { getContributionWeek, getContributionCountDay, getContributionDay } from "../lib/github/contribution";
import type { ContributionDay } from "../lib/github/contribution";
import dayjs from "../lib/dayjs";

const createTweetText = (contribution: ContributionDay): string => {
  const contentText = `
📅: ${dayjs(contribution.date).format("YYYY/MM/DD")}
➕: ${contribution.contributionCount} commits
`.trim();

  // The url will be a 30-character shortened URL, so the content will be truncate to 105 characters.
  return truncateText(contentText, 103);
};

export const tweetCommitsPerDay = async (): Promise<void> => {
  const contributionWeek = await getContributionWeek();
  const contributionDay = getContributionDay(contributionWeek);
  const commitsDay = getContributionCountDay(contributionDay);

  console.info(`${contributionDay.date} has ${commitsDay} commits`);

  if (!shouldTweet(commitsDay)) {
    console.info("No need to tweet");
    return Promise.resolve();
  }

  // tweet commits per day with a bot
  await tweet(twitterClient, createTweetText(contributionDay));
};
