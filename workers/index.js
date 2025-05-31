export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const hostname = url.hostname

    if (request.method === 'GET' && hostname === env.CLOUDFLARE_WORKERS_HOSTNAME) {
      // ref docs: https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-connecting-ip
      const ip = request.headers.get('CF-Connecting-IP')
      return new Response(ip, { status: 200 })
    } else {
      return new Response('Invalid Request Method', { status: 400 })
    }
  }
}
