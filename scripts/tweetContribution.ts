import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import * as dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
};

initializeApp(firebaseConfig);

(async () => {
  const functions = getFunctions();
  const tweetContribution = httpsCallable(functions, 'tweetContribution');
  try {
    const result = await tweetContribution({ data: {} });
    console.log(result);
  } catch (e) {
    console.error(e);
  }
})();
