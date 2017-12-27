/**
 * Creator: Tang Xiaoji
 * Time: 2017-12-27
 */

const request = require('request');

function fetch(url) {
  const options = {
    url: url,
    headers: {
      'Connection': 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'
    }
  };

  return new Promise(function (resolve, reject) {
    request(options, (err, _, body) => {
      if(err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

module.fetch = fetch;
