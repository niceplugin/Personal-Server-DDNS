import 'dotenv/config'
import http from 'http'

/**
 * Cloudflare Worker를 통해 현재 IP 주소를 가져오는 함수
 *
 * @returns {Promise<{ statusCode?: number, body: string }>} 상태 코드와 IP 주소를 포함한 응답
 */
export function getIP(): Promise<{ statusCode?: number, body: string }> {
  return new Promise((resolve, reject) => {
    const hostname = process.env['CLOUDFLARE_WORKERS_HOSTNAME']!

    // HTTP 요청 옵션 설정
    const options = {
      hostname,
      port: 80,
      path: '/',
      method: 'GET',
    }

    // HTTP 요청 생성 및 응답 처리
    const req = http.request(options, (res) => {
      let myIp = ''

      // 데이터 수신 이벤트 처리
      res.on('data', (chunk) => {
        myIp += chunk
      })

      // 응답 완료 이벤트 처리
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: myIp,
        })
      })
    })

    // 오류 이벤트 처리
    req.on('error', (error) => {
      console.error('Error fetching IP address:', error)
      reject(error)
    })

    // 요청 종료
    req.end()
  })
}
