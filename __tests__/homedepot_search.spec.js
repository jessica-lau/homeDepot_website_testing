var webdriver = require('selenium-webdriver'),
  By = webdriver.By;
require('selenium-webdriver/testing');
require('dotenv').config();
var assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe("Home Page", () => {
  let driver;

  before(async () => {
    var capabilities = {
      'browserName': 'Chrome',
      'browser_version': '60.0',
      'os': 'Windows',
      'os_version': '10',
      'resolution': '1920x1080',
      'browserstack.user': process.env.browserstack_user,
      'browserstack.key': process.env.browserstack_key,
      'name': 'B Sample Test'
    };
    //Note: run test on browserstacker:

    // var builder = new webdriver.Builder().
    //   usingServer('http://hub-cloud.browserstack.com/wd/hub').
    //   withCapabilities(capabilities);
    // driver = await builder.build();

    //Note: run test on local broswer:
    let localChromeOption = new chrome.Options();
    localChromeOption.addArguments("--start-maximized");

    driver = await new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .setChromeOptions(localChromeOption)
      .build();

    console.log("started testing");
    //driver.manage().window().maximize();
    await driver.get('http://www.homedepot.com');

  });

  after(async () => {
    await driver.quit();
  });

  describe("Header", () => {
    it("should exist", async () => {
      let title = await driver.getTitle()
      console.log(assert.equal(title, "The Home Depot"));
    });

    it("search item on homepage", async () => {
      let search = await driver.findElement(By.id(`headerSearch`));
      await search.sendKeys('lawnmower\n');
      await driver.sleep(5000);
      let searchElement = await driver.findElement(By.className(`original-keyword`));
      let result = await searchElement.getText();
      console.log("result:" + result);
      console.log(assert.equal(result, '"lawnmower"'));

    });

    it("filter item by price", async () => {
      let filterMinPrice = await driver.findElement(By.css(`[name="lowerBound"]`));
      await filterMinPrice.sendKeys('100');
      let filterMaxPrice = await driver.findElement(By.css(`[name="upperBound"]`));
      await filterMaxPrice.sendKeys('400');
      let filterPrice = await driver.findElement(By.css(`[data-test-id="price-refinement__submit"]`));
      let isFilterPriceDisplayed = await filterPrice.isDisplayed();
      assert.equal(isFilterPriceDisplayed, 1);
      await filterPrice.click();
      await driver.sleep(5000);
    }
    )

  });
});
