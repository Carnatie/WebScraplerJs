const puppeteer = require('puppeteer-extra')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')

puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: process.env.CAPTCHA_TOKEN // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY 
    },
    visualFeedback: true
  })
)
