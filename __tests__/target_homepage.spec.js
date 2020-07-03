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
    await driver.get('http://www.target.com');

  });

  after(async () => {
    await driver.quit();
  });

  describe("Header", () => {
    it.skip("should exist", async () => {
      let title = await driver.getTitle()
      console.log(assert.equal(title, "Target : Expect More. Pay Less."));
    });

    it("search item on homepage", async () => {
      let chips = await driver.findElement(By.id(`search`));
      await chips.sendKeys('chips\n');
      await driver.sleep(5000);
      let chipsElement = await driver.findElement(By.className(`h-text-lg`));
      let result = await chipsElement.getText();
      console.log("result:" + result);
      console.log(assert.equal(result, "chips"));
      await driver.sleep(5000);

    });

    it("search if cart exists", async () => {
      let cart = await driver.findElement(By.id(`cart`));
      let isCartDisplayed = await cart.isDisplayed();
      assert.equal(isCartDisplayed, 1);
      await cart.click();
      await driver.sleep(5000);
      let cartElement = await driver.findElement(By.id(`cart-container`));
      let isCartElementDisplayed = await cartElement.isDisplayed();
      assert.equal(isCartElementDisplayed, 1);

    });

    it("search if profile exists", async () => {
      let profile = await driver.findElement(By.id(`account`));
      let isProfileDisplayed = await profile.isDisplayed();
      assert.equal(isProfileDisplayed, 1);
      await profile.click();
      await driver.sleep(5000);
      let profileElement = await driver.findElement(By.id(`accountNav-myStore`));
      let isProfileElementDisplayed = await profileElement.isDisplayed();
      assert.equal(isProfileElementDisplayed, 1);

    });

    it("search if deals have clearance category", async () => {
      let deals = await driver.findElement(By.id(`secondary`));
      let isDealsDisplayed = await deals.isDisplayed();
      assert.equal(isDealsDisplayed, 1);
      await deals.click();
      await driver.sleep(5000);
      let dealsMenu = driver.findElement(By.id(`deals-clearance`));
      let isDealsMenuDisplayed = await dealsMenu.isDisplayed();
      assert.equal(isDealsMenuDisplayed, 1);
      await dealsMenu.click();
      await driver.sleep(5000);
    });

    it("search if whats new have new in women category", async () => {
      let whatsNew = await driver.findElement(By.id(`trending`));
      let isWhatsNewDisplayed = await whatsNew.isDisplayed();
      assert.equal(isWhatsNewDisplayed, 1);
      await whatsNew.click();
      await driver.sleep(5000);
      let headerModalTrending = driver.findElement(By.className(`HeaderModalTrending`));
      let trendingMenu = await headerModalTrending.findElements(By.css(`li`));
      let isTrendingMenuDisplayed = await trendingMenu[1].isDisplayed();
      assert.equal(isTrendingMenuDisplayed, 1);
      await trendingMenu[1].click();
      await driver.sleep(5000);
    });

    it("search if same day delivery exists", async () => {
      let sameDayDelivery = await driver.findElement(By.id(`SameDayLink`));
      let isSameDayDeliveryDisplayed = await sameDayDelivery.isDisplayed();
      assert.equal(isSameDayDeliveryDisplayed, 1);
      await sameDayDelivery.click();
      await driver.sleep(5000);
      let sameDayDeliveryElement = await driver.findElement(By.id(`tab-Browse`));
      let isSameDayElementDisplayed = await sameDayDeliveryElement.isDisplayed();
      assert.equal(isSameDayElementDisplayed, 1);
    });

  });
});
