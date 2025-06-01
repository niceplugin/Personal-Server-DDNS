/**
 * Cloudflare Worker 설정
 * 클라이언트의 IP 주소를 반환하는 간단한 API
 */
export default {
  /**
   * 요청을 처리하는 메인 함수
   *
   * @param {Request} request - 들어오는 HTTP 요청
   * @param {Object} env - 환경 변수
   * @returns {Promise<Response>} HTTP 응답
   */
  async fetch(request, env) {
    // 요청 URL 파싱
    const url = new URL(request.url)
    const hostname = url.hostname

    // GET 요청이고 올바른 호스트 이름인 경우에만 처리
    if (request.method === 'GET' && hostname === env.CLOUDFLARE_WORKERS_HOSTNAME) {
      // 참조 문서: https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-connecting-ip
      // Cloudflare에서 제공하는 클라이언트 IP 주소 헤더 사용
      const ip = request.headers.get('CF-Connecting-IP')
      // IP 주소를 응답으로 반환
      return new Response(ip, { status: 200 })
    } else {
      // 잘못된 요청 방법이나 호스트 이름인 경우 오류 응답
      return new Response('Invalid Request Method', { status: 400 })
    }
  }
}
