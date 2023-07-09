const { Builder, Browser, By, Key, until } = require('selenium-webdriver')

;(async function example() {
  let driver = await new Builder().forBrowser(Browser.EDGE).build()
  try {
    await driver.get('https://cn.bing.com')
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
    await driver.wait(until.titleIs('webdriver - 搜索'), 1000)
  } finally {
    await driver.quit()
  }
})()
