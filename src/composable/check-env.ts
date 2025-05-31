import 'dotenv/config'

export function checkEnv() {
  const requiredEnvVars = [
    'CLOUDFLARE_EMAIL',
    'CLOUDFLARE_API_TOKEN',
    'CLOUDFLARE_ZONE_ID',
    'CLOUDFLARE_WORKERS_HOSTNAME',
    'CLOUDFLARE_DDNS_TARGET_DOMAIN',
  ]

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

  if (missingVars.length > 0) {
    console.error('Missing environment variables:', missingVars.join(', '))
    return false
  }

  return true
}