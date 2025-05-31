import 'dotenv/config'
import Cloudflare from 'cloudflare'
import type { RecordEditParams, RecordResponse } from 'cloudflare/resources/dns'

export async function updateDnsRecord(recordId: RecordResponse['id'], params: RecordEditParams) {
  const apiEmail = process.env['CLOUDFLARE_EMAIL']!
  const apiToken = process.env['CLOUDFLARE_API_TOKEN']!
  const zone_id = process.env['CLOUDFLARE_ZONE_ID']!

  const client = new Cloudflare({
    apiEmail,
    apiToken,
  })

  try {
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
