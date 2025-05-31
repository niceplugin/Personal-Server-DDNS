import 'dotenv/config'
import Cloudflare from 'cloudflare'
import { RecordCreateParams } from 'cloudflare/src/resources/dns/records'

export async function createDnsRecord(params: RecordCreateParams) {
  const apiEmail = process.env['CLOUDFLARE_EMAIL']!
  const apiToken = process.env['CLOUDFLARE_API_TOKEN']!
  const zone_id = process.env['CLOUDFLARE_ZONE_ID']!

  const client = new Cloudflare({
    apiEmail,
    apiToken,
  })

  try {
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
