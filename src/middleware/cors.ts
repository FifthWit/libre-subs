export default defineEventHandler(async (event) => {
  const origin = getHeader(event, 'origin')
  
  // Define allowed origins
  const allowedOrigins = [
    'https://pstream.mov',
    'http://pstream.mov',
    'https://beta.pstream.mov',
    'http://beta.pstream.mov'
  ]
  
  // Check for wildcard subdomains of pstream.mov
  const isSubdomainAllowed = origin && /^https?:\/\/[a-zA-Z0-9-]+\.pstream\.mov$/.test(origin)
  
  // Check if origin is explicitly allowed or is a subdomain
  const isOriginAllowed = origin && (allowedOrigins.includes(origin) || isSubdomainAllowed)
  
  if (isOriginAllowed) {
    setHeader(event, 'Access-Control-Allow-Origin', origin)
  }
  
  // Set other CORS headers
  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  setHeader(event, 'Access-Control-Allow-Credentials', 'true')
  setHeader(event, 'Access-Control-Max-Age', '86400') // 24 hours
  
  // Handle preflight OPTIONS requests
  if (getMethod(event) === 'OPTIONS') {
    setResponseStatus(event, 204)
    return ''
  }
})