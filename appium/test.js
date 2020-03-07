var wd = require('wd');
var assert = require('assert');
var asserters = wd.asserters;

var username = '<BSTACK_USERNAME>'
var access_key = '<BSTACK_ACCESS_KEY>'
var app_url = 'bs://<APP_HASHED_ID>'

desiredCaps = {
  'browserstack.user' : username,
  'browserstack.key' : access_key,
  'app' : app_url,
  'build' : 'Node Android',
  'name': 'single_test',
  'device' : 'Google Pixel',
  'browserstack.debug' : true
};
driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");
 
driver
  .init(desiredCaps)
  .then(function () {
    return driver.waitForElementById("com.example.myapplication:id/command_text", asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (searchInput) {
    return searchInput.sendKeys("pwd");
  })
  .then(function () {
    var element = driver.waitForElementById("com.example.myapplication:id/command_text", asserters.isDisplayed && asserters.isEnabled, 30000);
    return element.getText();
  })
  .then(function (search_results) {
    assert(search_results.length > 0);
  })
  .fin(function() { return driver.quit(); })
  .done();