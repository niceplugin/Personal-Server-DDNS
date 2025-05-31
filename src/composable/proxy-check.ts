import 'dotenv/config'
import { getIP } from '@/composable/get-ip'
import { getDnsRecord } from '@/composable/get-dns-record'
import { updateDnsRecord } from '@/composable/update-dns-record'
import { createDnsRecord } from '@/composable/create-dns-record'
import type { RecordEditParams } from 'cloudflare/resources/dns'

export async function proxyCheck() {
  const type = process.env['CLOUDFLARE_RECORD_TYPE'] as RecordEditParams['type'] || 'A'
  const name = process.env['CLOUDFLARE_DDNS_TARGET_SUB_DOMAIN']!
  const targetDomain = process.env['CLOUDFLARE_DDNS_TARGET_DOMAIN']!
  const domain = name ? `${ name }.${ targetDomain }` : targetDomain

  try {
    const ip = await getIP()
    const record = await getDnsRecord(type, domain)

    if (ip.statusCode !== 200) return

    if (record) {
      if (record.content === ip.body) {
        console.log(`DNS record for ${ domain } is already up to date.`)
        return
      }
      await updateDnsRecord(record.id, {
        type,
        name,
        content: ip.body,
        zone_id: '',
      })
    }
    else {
      console.log(`No DNS record found for ${ domain }`)
      console.log('Creating a new DNS record...')
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