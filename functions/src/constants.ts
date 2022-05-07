import * as functions from "firebase-functions";

// GitHub
const GITHUB_READ_USER_TOKEN = functions.config().github.read_user_token;
const GITHUB_USER = "x7ddf74479jn5";
const GITHUB_ENDPOINT = "https://api.github.com/graphql";
export { GITHUB_READ_USER_TOKEN, GITHUB_USER, GITHUB_ENDPOINT };

// Twitter
const TWITTER_APP_KEY = functions.config().twitter.app_key;
const TWITTER_APP_SECRET = functions.config().twitter.app_secret;
const TWITTER_ACCESS_TOKEN = functions.config().twitter.access_token;
const TWITTER_ACCESS_SECRET = functions.config().twitter.access_secret;
export { TWITTER_APP_KEY, TWITTER_APP_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET };
