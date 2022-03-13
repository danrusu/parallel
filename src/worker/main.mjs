import Worker from 'web-worker';

const url = new URL('./worker.cjs', import.meta.url);
const worker = new Worker(url);

worker.addEventListener('message', e => {
  console.log(e.data); // messaje from worker
});

worker.postMessage('https://httpstat.us/200');
