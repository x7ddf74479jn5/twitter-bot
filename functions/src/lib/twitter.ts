import TwitterApi from "twitter-api-v2";
import { TWITTER_APP_KEY, TWITTER_APP_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET } from "../constants";

export const twitterClient = new TwitterApi({
  appKey: TWITTER_APP_KEY,
  appSecret: TWITTER_APP_SECRET,
  accessToken: TWITTER_ACCESS_TOKEN,
  accessSecret: TWITTER_ACCESS_SECRET,
});

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.substr(0, maxLength) + "..." : text;
};

export const tweet = async (client: TwitterApi, text: string): Promise<void> => {
  await client.v1.tweet(text);
};
