import 'dotenv/config'
import http from 'http'

export function getIP(): Promise<{ statusCode?: number, body: string }> {
  return new Promise((resolve, reject) => {
    const hostname = process.env['CLOUDFLARE_WORKERS_HOSTNAME']!

    const options = {
      hostname,
      port: 80,
      path: '/',
      method: 'GET',
    }

    const req = http.request(options, (res) => {
      let myIp = ''

      res.on('data', (chunk) => {
        myIp += chunk
      })

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: myIp,
        })
      })
    })

    req.on('error', (error) => {
      console.error('Error fetching IP address:', error)
      reject(error)
    })

    req.end()
  })
}
