import * as functions from "firebase-functions";
import { tweetCommitsPerDay } from "../core/commit";

const runtimeOpts = {
  timeoutSeconds: 180,
  memory: "512MB" as const,
};

export const tweetContribution = functions
  .region("asia-northeast1")
  .runWith(runtimeOpts)
  .pubsub.schedule("0 1 * * *")
  .timeZone("Asia/Tokyo")
  .onRun(async (_context) => {
    try {
      await Promise.all([tweetCommitsPerDay()]);
    } catch (e) {
      console.error(e);
    }
  });
