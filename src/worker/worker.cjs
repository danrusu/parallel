const fetch = require('isomorphic-fetch');

addEventListener('message', e => {
  fetch(e.data).then(res => {
    res.text().then(text => {
      postMessage(text);
    });
  });
});
