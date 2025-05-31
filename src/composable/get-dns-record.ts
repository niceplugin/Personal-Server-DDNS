import 'dotenv/config'
import Cloudflare from 'cloudflare'
import type { RecordResponse } from 'cloudflare/resources/dns'

export async function getDnsRecord(type: string = 'A', name: string = 'server.1min.games'): Promise<RecordResponse | undefined> {
  const apiEmail = process.env['CLOUDFLARE_EMAIL']!
  const apiToken = process.env['CLOUDFLARE_API_TOKEN']!
  const zone_id = process.env['CLOUDFLARE_ZONE_ID']!

  const client = new Cloudflare({
    apiEmail,
    apiToken,
  })

  try {
    const recordResponse = await client.dns.records.list({ zone_id })
    return recordResponse.result.find(record => record.type === type && record.name === name)
  }
  catch (error) {
    console.error('Error fetching DNS records:', error)
    return
  }
}
