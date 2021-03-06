import { twitterClient, tweet, truncateText } from "../lib/twitter";
import { getNewRepository, RepositoryNewItem } from "../lib/github/new-repository";
import { TweetNewRepositoryData } from "../callable";

const createTweetText = (repository: RepositoryNewItem): string => {
  /**
   * The urls will be a 30-character shortened URL.
   * The name and description is up to 191 alphabet characters
   */
  const contentText = `
š¦ New repository: ${repository.name}
š Description: ${repository.description ? truncateText(repository.description, 150) : "No description"}
š URL: ${repository.url}${repository.homepageUrl ? `\nš Demo: ${repository.homepageUrl}` : ""}
`.trim();

  return contentText;
};

export const tweetNewRepository = async (data: TweetNewRepositoryData): Promise<void> => {
  const { repoName } = data;
  const newRepository = await getNewRepository(repoName);

  console.info(`New repository: ${newRepository.name}`);

  // tweet new repository
  await tweet(twitterClient, createTweetText(newRepository));
};
