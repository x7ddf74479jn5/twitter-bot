import * as functions from "firebase-functions";
import { tweetCommitsPerDay } from "../core/contribution";

const runtimeOpts = {
  timeoutSeconds: 180,
  memory: "512MB" as const,
};

export const tweetContribution = functions
  .region("asia-northeast1")
  .runWith(runtimeOpts)
  .https.onCall(async (_data, _context) => {
    const errorHandler = (e: unknown, type: string) => {
      console.error(`${type} tweet error`);
      console.error(e);
    };

    // NOTE: Run in series to prevent stop in case of rejects
    await tweetCommitsPerDay().catch((e) => errorHandler(e, "Contribution"));

    return { message: "success" };
  });
