import 'dotenv/config'
import { getIP } from '@/composable/get-ip'
import { getDnsRecord } from '@/composable/get-dns-record'
import { updateDnsRecord } from '@/composable/update-dns-record'
import { createDnsRecord } from '@/composable/create-dns-record'
import type { RecordEditParams } from 'cloudflare/resources/dns'

/**
 * 현재 IP 주소를 확인하고 필요한 경우 DNS 레코드를 업데이트하는 함수
 * 레코드가 없는 경우 새로 생성합니다.
 */
export async function proxyCheck() {
  // 환경 변수에서 DNS 레코드 정보 가져오기
  const type = process.env['CLOUDFLARE_RECORD_TYPE'] as RecordEditParams['type'] || 'A'
  const name = process.env['CLOUDFLARE_DDNS_TARGET_SUB_DOMAIN']!
  const targetDomain = process.env['CLOUDFLARE_DDNS_TARGET_DOMAIN']!
  // 전체 도메인 이름 구성 (서브도메인이 있는 경우 포함)
  const domain = name ? `${ name }.${ targetDomain }` : targetDomain

  try {
    // 현재 IP 주소 가져오기
    const ip = await getIP()
    // 현재 DNS 레코드 조회
    const record = await getDnsRecord(type, domain)

    // IP 주소 조회 실패 시 종료
    if (ip.statusCode !== 200) return

    // 기존 DNS 레코드가 있는 경우
    if (record) {
      // 레코드의 IP가 현재 IP와 동일한 경우 업데이트 불필요
      if (record.content === ip.body) {
        console.log(`DNS record for ${ domain } is already up to date.`)
        return
      }
      // 레코드 업데이트
      await updateDnsRecord(record.id, {
        type,
        name,
        content: ip.body,
        zone_id: '',
      })
    }
    // 기존 DNS 레코드가 없는 경우
    else {
      console.log(`No DNS record found for ${ domain }`)
      console.log('Creating a new DNS record...')
      // 새 레코드 생성
      await createDnsRecord({
        type,
        name,
        content: ip.body,
        proxied: true,
        zone_id: '',
      })
      return
    }
  }
  catch (error) {
    console.error('Error:', error)
  }
}
