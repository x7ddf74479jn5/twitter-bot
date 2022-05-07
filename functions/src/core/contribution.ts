import { shouldTweet } from "../lib/utils";
import { tweetFromContribution, twitterClient } from "../lib/twitter";
import { getContributionWeek, getContributionCountDay, getContributionDay } from "../lib/github/contribution";

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
  await tweetFromContribution(twitterClient, contributionDay);
};
