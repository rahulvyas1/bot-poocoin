const { Cluster } = require('puppeteer-cluster');
const vanillaPuppeteer = require('puppeteer');
const { addExtra } = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
const Recaptcha = require('puppeteer-extra-plugin-recaptcha');
const randomUseragent = require('random-useragent');

(async () => {
  // Create a cluster with 2 workers

  const puppeteer = addExtra(vanillaPuppeteer);
  puppeteer.use(Stealth());

  const cluster = await Cluster.launch({
    puppeteer,
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 8,
    timeout: 20000,
    puppeteerOptions: {
      args: [
        '--proxy-server=http://104.131.127.222:50000',
        '--incognito',
        '--no-sandbox',
      ],
      headless: false,
    },
  });

  // Define a task
  let i = 0;
  await cluster.task(async ({ page, data: url }) => {
    i++;
    page.setExtraHTTPHeaders({ referer: 'https://pangeamovement.com' });
    console.log('i', i);
    await page.setUserAgent(
        randomUseragent.getRandom()
    ); // like this
    await page.goto(url);
    await page.waitForSelector(
      '#root > div > div.d-none.d-md-flex.flex-column.flex-grow-1 > div.d-flex.flex-column.flex-grow-1.pe-2 > div > div.d-flex.flex-column.flex-grow-1.ps-2.pt-2.lh-1 > div.d-flex.align-items-start.flex-wrap > div.mt-1.ps-2.d-flex.align-items-center.flex-grow-1 > div > div.d-flex.flex-wrap > div > h1'
    );
    await delay(6000);
  });

  // Add some pages to queue
  for (let u = 0; u < 10000; u++) {
    cluster.queue(
      //   'https://www.whatismyreferer.com/'
      'https://poocoin.app/tokens/0x123f92226c626adc919ad122d6cc3c20a6c25666'
    );
  }

  // Shutdown after everything is done
  await cluster.idle();
  await cluster.close();
})();

const delay = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};
