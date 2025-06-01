import 'dotenv/config'
import { RecordCreateParams } from 'cloudflare/src/resources/dns/records'
import { newCloudflareClient } from '@/composable/new-cloudflare-client'

/**
 * Cloudflare API를 사용하여 새 DNS 레코드를 생성하는 함수
 *
 * @param {RecordCreateParams} params - 생성할 DNS 레코드 매개변수
 */
export async function createDnsRecord(params: RecordCreateParams) {
  const zone_id = process.env['CLOUDFLARE_ZONE_ID']!
  const client = newCloudflareClient()

  try {
    // DNS 레코드 생성 API 호출
    const recordResponse = await client.dns.records.create({
      ...params,
      zone_id,
    })
    console.log('Created DNS record:', recordResponse)
  }
  catch (error) {
    console.error('Error creating DNS record:', error)
  }
}
