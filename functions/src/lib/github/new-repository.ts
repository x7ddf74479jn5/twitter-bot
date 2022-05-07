import got from "got";

import { GITHUB_USER, GITHUB_READ_USER_TOKEN, GITHUB_ENDPOINT } from "../../constants";

type RepositoryNewItemQuery = {
  data: {
    repository: {
      name: string;
      description: string;
      url: string;
      homepageUrl: string;
    };
  };
};

export type RepositoryNewItem = RepositoryNewItemQuery["data"]["repository"];

const query = `
query ($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    name
    description
    url
    homepageUrl
  }
}
`;

const getVariables = (repoName: string) => {
  return `{
  "owner": "${GITHUB_USER}",
  "name": "${repoName}"
}
`;
};

export const getNewRepository = async (repoName: string): Promise<RepositoryNewItem> => {
  const json = { query, variables: getVariables(repoName) };

  const { data }: RepositoryNewItemQuery = await got
    .post(GITHUB_ENDPOINT, {
      headers: { Authorization: `Bearer ${GITHUB_READ_USER_TOKEN}` },
      json,
    })
    .json();

  const { repository } = data;

  if (!repository) {
    throw new Error(`No repository found for ${repoName}`);
  }

  return repository;
};
