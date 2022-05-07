import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { firebaseConfig } from '../config/firebase';

const app = initializeApp(firebaseConfig);

(async () => {
  const functions = getFunctions(app, 'asia-northeast1');
  const tweetContribution = httpsCallable(functions, 'callable-tweetContribution');
  try {
    const result = await tweetContribution({ data: {} });
    console.log(result);
  } catch (e) {
    console.error(e);
  }
})();
