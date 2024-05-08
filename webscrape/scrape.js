const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp'
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://bleacherreport.com/nba');

  const nbaHandles = await page.$$('div.organism.contentStream.selected .atom');
  console.log(`Found ${nbaHandles.length} nbaHandles`);

  for (const nbaHandle of nbaHandles) {
    try {
      const nbaTitle = await page.evaluate(el => {
        const titleElement = el.querySelector("li > div.atom.commentary > h3");
        return titleElement ? titleElement.textContent.trim() : null;
      }, nbaHandle);
  
      if (nbaTitle) {
        console.log(`Title: ${nbaTitle}`);
      } else {
      }
      const nbaPara = await page.evaluate(el => {
        const paraElement = el.querySelector("li > div.atom.commentary > p");
        return paraElement ? paraElement.textContent.trim() : null;
      }, nbaHandle);
  
      if (nbaPara) {
        console.log(`P: ${nbaPara}`);
      } else {
      }

      /*const nbaJpg = await page.evaluate(el => {
        const jpgElement = el.querySelector("");
        return jpgElement ? jpgElement.src : null;
      }, nbaHandle);
  
      if (nbaJpg) {
        console.log(`NBA JPG: ${nbaJpg}`);
      }*/
    } catch (error) {
      console.error(`Error occurred for handle: ${error.message}`);
    }
  }


  //await browser.close();
})();