/**
 * Creator: Tang Xiaoji
 * Time: 2017-12-27
 */

const request = require('request');
const conn = require('../../config/mysql');

function fetchBookList(start) {
  const options = {
    url: `https://book.douban.com/top250?start=${start}`,
    headers: {
      'Connection': 'close',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'
    }
  };

  request(options, (err, res, body) => {
    try {
      const arr = body.replace(/\s+/g, "").split('<tablewidth="100%">').slice(1);

      arr.forEach((ele) => {
        let title = ele.match(/&#34;title="(\S*)">(\S*)<\/a>(\S*)pclass="pl"/)[1];
        if(title.indexOf('>') !== -1) {
          title = title.match(/(\S*)">/)[1];
        }
        const alias = ele.match(/<spanstyle="font-size:12px;">(\S*)<\/span><\/div><pclass="pl"/) ? ele.match(/<spanstyle="font-size:12px;">(\S*)<\/span><\/div><pclass="pl"/)[1] : title;
        const url = ele.match(/<aclass="nbg"href="(\S*)"onclick="moreurl/)[1];
        const bid = url.match(/subject\/(\S*)\//)[1];
        const img = ele.match(/<imgsrc="(\S*)"width="90"/)[1];
        const mark = ele.match(/<spanclass="rating_nums">(\S*)<\/span><spanclass="pl"/)[1];
        const judge = ele.match(/<spanclass="pl">\((\S*)\)<\/span>/)[1];
        const desc = ele.match(/<spanclass="inq">(\S*)<\/span><\/p><\/td>/) ? ele.match(/<spanclass="inq">(\S*)<\/span><\/p><\/td>/)[1] : 'none';
        const info = ele.match(/div><pclass="pl">(\S*)<\/p><divclass="starclearfix">/)[1];

        conn.query(`INSERT INTO \`books_top250\` (\`bid\`, \`title\`, \`alias\`, \`url\`, \`img\`, \`mark\`, \`judge\`, \`abstract\`, \`info\`) VALUES ('${parseInt(bid)}','${title}','${alias}','${url}','${img}','${mark}','${judge}','${desc}','${info}')`, function (err, results, fields) {
          if (err) {
            console.log(err);
          }
        });
      });
    } catch (e) {
      console.log('fetch book list error: ', e.toString());
    }
  });
}

for(let i = 0; i <= 255; i += 25) {
  fetchBookList(i);
}
