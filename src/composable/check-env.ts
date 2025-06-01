import 'dotenv/config'

/**
 * 필수 환경 변수가 모두 설정되어 있는지 확인하는 함수
 *
 * @returns {boolean} 모든 필수 환경 변수가 설정되어 있으면 true, 아니면 false
 */
export function checkEnv() {
  // 필수 환경 변수 목록
  const requiredEnvVars = [
    'CLOUDFLARE_EMAIL',
    'CLOUDFLARE_API_TOKEN',
    'CLOUDFLARE_ZONE_ID',
    'CLOUDFLARE_WORKERS_HOSTNAME',
    'CLOUDFLARE_DDNS_TARGET_DOMAIN',
  ]

  // 설정되지 않은 환경 변수 찾기
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

  // 누락된 환경 변수가 있는 경우 오류 메시지 출력 후 false 반환
  if (missingVars.length > 0) {
    console.error('Missing environment variables:', missingVars.join(', '))
    return false
  }

  // 모든 환경 변수가 설정된 경우 true 반환
  return true
}
