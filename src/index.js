import puppeteer from "puppeteer-core";
import fs from "fs";
const result = { result: [] };
const app = puppeteer;
const browser = await app.launch({
  headless: false,
  executablePath: process.env.CHROME_BIN,
  executablePath:
    "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
});
const page = await browser.newPage();
await page.goto("https://top-1000-sekolah.ltmpt.ac.id/");
// await page.type("input[data-unify=Search]", "kacamata");
// await page.click("button[type=submit]");

const ProductName = await page.evaluate(() =>
  Array.from(
    document.querySelectorAll("#w0 > table > tbody > tr"),
    (e) => e.innerHTML
  )
);
for (let i = 1; i < ProductName.length; i++) {
  const ranking = await page.$x(`//*[@id="w0"]/table/tbody/tr[${i}]/td[1]`);
  const name = await page.$x(`//*[@id="w0"]/table/tbody/tr[${i}]/td[4]`);
  let getRanking = await page.evaluate((el) => el.textContent, ranking[0]);
  let getName = await page.evaluate((el) => el.textContent, name[0]);
  let obj = { ranking: getRanking, name: getName.replace(" More..", "") };

  result.result.push(obj);
}
console.log(result);

fs.writeFile("output.json", JSON.stringify(result), "utf8", function (err) {
  if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
  }

  console.log("JSON file has been saved.");
});
