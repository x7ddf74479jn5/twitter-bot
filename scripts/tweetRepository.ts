import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { firebaseConfig } from '../config/firebase';

const repoName = process.argv[2];

const app = initializeApp(firebaseConfig);

(async () => {
  const functions = getFunctions(app, 'asia-northeast1');
  const tweetRepository = httpsCallable(functions, 'callable-tweetRepository');
  const data = { repoName: repoName };
  try {
    const result = await tweetRepository(data);
    console.log(result);
  } catch (e) {
    console.error(e);
  }
})();
