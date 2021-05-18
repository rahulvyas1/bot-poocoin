const axios = require('axios').default;

let counter = 0;
const init = async () => {
  try {
    await executeBot();
  } catch (e) {
    console.log(e);
  }
  console.log('Bot run successfully.');
};

const hit = async (i) => {
  try {

    const options = {
      // url: "https://google.com",
      url: "https://cnhnt.cc/public/vote/B1IiJFEtdPEbt7xLzDdl",
      method: "GET",
      proxy: "http://104.131.127.222:50000"
    };

    request(options, function(error, response, html) {
      console.log("res",response);
      console.log("error",error)
    });

    // const res = await axios.post(
    //   // "https://api.webscrapingapi.com/v1?api_key=HggOEY8bx3zNrvNovMm6NfeMKRugajJS&url=https://cnhnt.cc/public/vote/B1IiJFEtdPEbt7xLzDdl"
    //   // "https://api.scrapestack.com/scrape?access_key=3b88e642c0b97e8fb9b926edb76bd0ad&url=https://cnhnt.cc/public/vote/B1IiJFEtdPEbt7xLzDdl&premium_proxy=1&proxy_type=residential"
    //   // // 'http://api.scrapestack.com/scrape?access_key=4a8d88837812469da02dc20fb2df6c6a&url=https://cnhnt.cc/public/unVote/VGOEFarhym8PbH1btVWu'
    //   // 'http://api.scrapestack.com/scrape?access_key=3b88e642c0b97e8fb9b926edb76bd0ad&premium_proxy=1&&url=https://cnhnt.cc/public/vote/B1IiJFEtdPEbt7xLzDdl'
    // );
    // console.log(res.data.code)

    // if (res.data && res.data.status && res.data.status === 'success') {
    //   counter++;
    // }
    // console.log(`${counter}/${i+1}`);
  } catch (e) {
    console.log(e)
  }
};

const executeBot = async () => {
  for (let i = 0; i < 1000; i++) {
    await hit(i);
    console.log('i',i)
    // await delay(1000);
  }
};

const delay = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

(async () => {
  await init();
})();


