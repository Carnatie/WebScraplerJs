const puppeteer = require('puppeteer-extra')
require('dotenv').config()

require('./services/recaptcha')

const urlPortal = "https://www.edponline.com.br/para-sua-casa/login"
const urlContas = "https://www.edponline.com.br/servicos/extrato-de-contas"

const email = process.env.EDP_EMAIL
const senha = process.env.EDP_SENHA
const nInstalacao = process.env.EDP_NINSTALACAO

async function startBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  return {browser,page};
}

async function loginInPlatform() {
  const {browser,page} = await startBrowser({headless: true})
  page.setViewport({width: 1366,height: 768});
  await page.goto(urlPortal)
  await page.waitForTimeout(2000) // Espera
  // Aceitar Coookies
  await page.click("#onetrust-accept-btn-handler")
  await page.waitForTimeout(2000) // Espera
  
  // Seleciona Local Imóvel
  await page.click("#option-2")
  // Inserir Dados
  await page.click(process.env.USERNAME_SELECTOR)
  await page.keyboard.type(email)
  await page.click(process.env.PASSWORD_SELECTOR)
  await page.keyboard.type(senha)
  // Clicar botão login
  await page.click(process.env.CTA_SELECTOR)
  // Solve Captcha
  // await page.solveRecaptchas()
  await page.waitForTimeout(5000) // Espera
  await page.screenshot({path: 'logado.png'});
}

async function downloadFatura() {
  const {browser,page} = await startBrowser({headless: true})
  page.setViewport({width: 1366,height: 768});
  await page.click(`a#${nInstalacao}`) // ERROR
  await page.waitForTimeout(5000) // Espera
  await page.screenshot({path: 'logado2.png'});
  await page.goto(urlContas)
  await page.waitForTimeout(5000) // Espera
  await page.screenshot({path: 'logado3.png'});
}

(async () => {
  await loginInPlatform()
  await downloadFatura()
  process.exit(1)
})()