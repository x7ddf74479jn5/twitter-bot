import * as admin from "firebase-admin";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

import * as Pubsub from "./pubsub";
import * as Callable from "./callable";

export const pubsub = { ...Pubsub };
export const callable = { ...Callable };
