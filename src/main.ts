import 'dotenv/config'
import { checkEnv } from '@/composable/check-env'
import { proxyCheck } from '@/composable/proxy-check'

// 배치 실행 간격(초) 설정, 기본값 60초
const loop = Number(process.env['BATCH_LOOP_SECOND']) || 60

// 메인 함수: DNS 프록시 확인 실행
async function main() {
  await proxyCheck()
}

// 즉시 실행 함수
(async function() {
  console.log('Starting DNS Proxy Check...')
  // 필요한 환경 변수 확인
  if (!checkEnv()) return

  console.log('Environment variables are set correctly.')

  console.log(`Running every ${ loop } seconds...`)

  // 초기 실행
  await main()

  // 지정된 간격으로 주기적 실행
  setInterval(main, loop * 1000)
})()
