import 'dotenv/config'
import type { RecordResponse } from 'cloudflare/resources/dns'
import { newCloudflareClient } from '@/composable/new-cloudflare-client'

/**
 * Cloudflare API를 사용하여 특정 DNS 레코드를 조회하는 함수
 *
 * @param {string} type - DNS 레코드 타입 (기본값: 'A')
 * @param {string} name - DNS 레코드 이름 (기본값: 'server.1min.games')
 * @returns {Promise<RecordResponse | undefined>} 찾은 DNS 레코드 또는 undefined
 */
export async function getDnsRecord(type: string = 'A', name: string = 'server.1min.games'): Promise<RecordResponse | undefined> {
  const zone_id = process.env['CLOUDFLARE_ZONE_ID']!
  const client = newCloudflareClient()

  try {
    // DNS 레코드 목록 조회 API 호출
    const recordResponse = await client.dns.records.list({ zone_id })
    // 지정된 타입과 이름을 가진 레코드 찾기
    return recordResponse.result.find(record => record.type === type && record.name === name)
  }
  catch (error) {
    console.error('Error fetching DNS records:', error)
  }
}
