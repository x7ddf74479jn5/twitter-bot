import TwitterApi from "twitter-api-v2";
import * as functions from "firebase-functions";
import { shouldTweet } from "../lib/utils";
import { tweetFromContribution } from "../lib/twitter";
import { getContributionWeek, getContributionCountDay, getContributionDay } from "../lib/github";

const twitterClient = new TwitterApi({
  appKey: functions.config().twitter.app_key,
  appSecret: functions.config().twitter.app_secret,
  accessToken: functions.config().twitter.access_token,
  accessSecret: functions.config().twitter.access_secret,
});

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
