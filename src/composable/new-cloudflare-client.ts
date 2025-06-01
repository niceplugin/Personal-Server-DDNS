import 'dotenv/config'
import Cloudflare from 'cloudflare'

/**
 * Cloudflare API 클라이언트를 생성하는 함수
 * 
 * @returns {Cloudflare} 초기화된 Cloudflare API 클라이언트
 */
export function newCloudflareClient(): Cloudflare {
  // 환경 변수에서 Cloudflare API 인증 정보 가져오기
  const apiEmail = process.env['CLOUDFLARE_EMAIL']!
  const apiToken = process.env['CLOUDFLARE_API_TOKEN']!

  // Cloudflare API 클라이언트 초기화
  return new Cloudflare({
    apiEmail,
    apiToken,
  })
}
