import puppeteer from "puppeteer";

export const criarImagemPuppeteer = async (htmlContent) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  // Seleciona o card (o primeiro div interno)
  const card = await page.$("div > div");

  let screenshotBuffer;
  if (card) {
    screenshotBuffer = await card.screenshot({ type: "png" }); // retorna buffer
  } else {
    screenshotBuffer = await page.screenshot({ type: "png" });
  }

  await browser.close();
  return screenshotBuffer;
};
