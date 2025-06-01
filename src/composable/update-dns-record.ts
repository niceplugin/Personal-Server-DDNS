import 'dotenv/config'
import type { RecordEditParams, RecordResponse } from 'cloudflare/resources/dns'
import { newCloudflareClient } from '@/composable/new-cloudflare-client'

/**
 * Cloudflare API를 사용하여 기존 DNS 레코드를 업데이트하는 함수
 *
 * @param {RecordResponse['id']} recordId - 업데이트할 DNS 레코드의 ID
 * @param {RecordEditParams} params - 업데이트할 DNS 레코드 매개변수
 */
export async function updateDnsRecord(recordId: RecordResponse['id'], params: RecordEditParams) {
  const zone_id = process.env['CLOUDFLARE_ZONE_ID']!
  const client = newCloudflareClient()

  try {
    // DNS 레코드 업데이트 API 호출
    const recordResponse = await client.dns.records.edit(recordId, {
      ...params,
      zone_id,
    })
    console.log('Updated DNS record:', recordResponse)
  }
  catch (error) {
    console.error('Error updating DNS record:', error)
  }
}
