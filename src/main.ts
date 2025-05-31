import 'dotenv/config'
import { checkEnv } from '@/composable/check-env'
import { proxyCheck } from '@/composable/proxy-check'

const loop = Number(process.env['BATCH_LOOP_SECOND']) || 60

async function main() {
  await proxyCheck()
}

(async function() {
  console.log('Starting DNS Proxy Check...')
  if (!checkEnv()) return

  console.log('Environment variables are set correctly.')

  console.log(`Running every ${ loop } seconds...`)

  await main()

  setInterval(main, loop * 1000)
})()
