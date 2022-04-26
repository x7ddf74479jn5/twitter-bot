import * as functions from "firebase-functions";
import { tweetCommitsPerDay } from "../core/commit";

const runtimeOpts = {
  timeoutSeconds: 180,
  memory: "512MB" as const,
};

export const tweetContribution = functions
  .region("asia-northeast1")
  .runWith(runtimeOpts)
  .https.onRequest(async (_req, res) => {
    const errorHandler = (e: unknown, type: string) => {
      console.error(`${type} tweet error`);
      console.error(e);
    };

    // NOTE: Run in series to prevent stop in case of rejects
    await tweetCommitsPerDay().catch((e) => errorHandler(e, "Contribution"));

    res.send("success");
  });
