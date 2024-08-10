import { chromium } from "playwright";

(async function () {
  const browser = await chromium.launch({
    channel: "chrome",
  });

  const page = await browser.newPage();
  page.on("load", (p) => {
    console.log(p.url());
  });

  await page.goto("https://webui.me/docs/");

  await new Promise((r) => {});
})();
