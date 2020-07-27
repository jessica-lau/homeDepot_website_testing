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

        it("view local ad", async () => {
        let localAd = await driver.findElement(By.linkText(`Local Ad`));
        let isLocalAdDisplayed = await localAd.isDisplayed();
        assert.equal(isLocalAdDisplayed, 1);
        await localAd.click();
        await driver.sleep(6000);
        });


    });
});