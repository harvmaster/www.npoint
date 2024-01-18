const headers = [
  {
    header: 'Accept',
    valueType: 'string',
    recommendedValues: [
      'application/json',
      'text/html',
      'application/xml'
    ]
  },
  {
    header: 'Accept-Encoding',
    valueType: 'string',
    recommendedValues: [
      'gzip, deflate'
    ]
  },
  {
    header: 'Access-Control-Allow-Credentials',
    valueType: 'boolean',
    recommendedValues: [
      true
    ]
  },
  {
    header: 'Access-Control-Allow-Headers',
    valueType: 'string',
    recommendedValues: [
      'Content-Type, Authorization'
    ]
  },
  {
    header: 'Access-Control-Allow-Methods',
    valueType: 'string',
    recommendedValues: [
      'GET, POST, PUT, DELETE'
    ]
  },
  {
    header: 'Access-Control-Allow-Origin',
    valueType: 'string',
    recommendedValues: [
      '*'
    ]
  },
  {
    header: 'Access-Control-Expose-Headers',
    valueType: 'string',
    recommendedValues: [
      'Authorization'
    ]
  },
  {
    header: 'Access-Control-Max-Age',
    valueType: 'number',
    recommendedValues: [
      3600
    ]
  },
  {
    header: 'Authorization',
    valueType: 'string',
    recommendedValues: [
      'Bearer <token>',
      'Basic <base64-encoded-credentials>'
    ]
  },
  {
    header: 'Cache-Control',
    valueType: 'string',
    recommendedValues: [
      'no-cache',
      'max-age=3600'
    ]
  },
  {
    header: 'Connection',
    valueType: 'string',
    recommendedValues: [
      'keep-alive'
    ]
  },
  {
    header: 'Content-Disposition',
    valueType: 'string',
    recommendedValues: [
      'attachment; filename="example.txt"'
    ]
  },
  {
    header: 'Content-Encoding',
    valueType: 'string',
    recommendedValues: [
      'gzip'
    ]
  },
  {
    header: 'Content-Language',
    valueType: 'string',
    recommendedValues: [
      'en-US'
    ]
  },
  {
    header: 'Content-Length',
    valueType: 'number',
    recommendedValues: [
      1024
    ]
  },
  {
    header: 'Content-Location',
    valueType: 'string',
    recommendedValues: [
      '/path/to/resource'
    ]
  },
  {
    header: 'Content-Range',
    valueType: 'string',
    recommendedValues: [
      'bytes 200-1000/5000'
    ]
  },
  {
    header: 'Content-Type',
    valueType: 'string',
    recommendedValues: [
      'application/json',
      'application/x-www-form-urlencoded',
      'multipart/form-data'
    ]
  },
  {
    header: 'Date',
    valueType: 'string (date)',
    recommendedValues: [
      'Wed, 17 Jan 2024 05:06:35 GMT'
    ]
  },
  {
    header: 'ETag',
    valueType: 'string',
    recommendedValues: [
      '"etag-value"'
    ]
  },
  {
    header: 'Expect',
    valueType: 'string',
    recommendedValues: [
      '100-continue'
    ]
  },
  {
    header: 'Expires',
    valueType: 'string (date)',
    recommendedValues: [
      'Thu, 01 Dec 1994 16:00:00 GMT'
    ]
  },
  {
    header: 'Host',
    valueType: 'string',
    recommendedValues: [
      'api.example.com'
    ]
  },
  {
    header: 'If-Match',
    valueType: 'string',
    recommendedValues: [
      '"etag-value"'
    ]
  },
  {
    header: 'If-Modified-Since',
    valueType: 'string (date)',
    recommendedValues: [
      'Sat, 29 Oct 1994 19:43:31 GMT'
    ]
  },
  {
    header: 'If-None-Match',
    valueType: 'string',
    recommendedValues: [
      '"etag-value"'
    ]
  },
  {
    header: 'If-Range',
    valueType: 'string',
    recommendedValues: [
      '"etag-value"',
      'Sat, 29 Oct 1994 19:43:31 GMT'
    ]
  },
  {
    header: 'If-Unmodified-Since',
    valueType: 'string (date)',
    recommendedValues: [
      'Sat, 29 Oct 1994 19:43:31 GMT'
    ]
  },
  {
    header: 'Last-Modified',
    valueType: 'string (date)',
    recommendedValues: [
      'Sat, 29 Oct 1994 19:43:31 GMT'
    ]
  },
  {
    header: 'Location',
    valueType: 'string',
    recommendedValues: [
      'https://www.example.com/new-location'
    ]
  },
  {
    header: 'Max-Forwards',
    valueType: 'number',
    recommendedValues: [
      10
    ]
  },
  {
    header: 'Origin',
    valueType: 'string',
    recommendedValues: [
      'https://www.example.com'
    ]
  },
  {
    header: 'Pragma',
    valueType: 'string',
    recommendedValues: [
      'no-cache'
    ]
  },
  {
    header: 'Proxy-Authenticate',
    valueType: 'string',
    recommendedValues: [
      'Basic realm="example"'
    ]
  },
  {
    header: 'Proxy-Authorization',
    valueType: 'string',
    recommendedValues: [
      'Basic <base64-encoded-credentials>'
    ]
  },
  {
    header: 'Proxy-Connection',
    valueType: 'string',
    recommendedValues: [
      'keep-alive'
    ]
  },
  {
    header: 'Range',
    valueType: 'string',
    recommendedValues: [
      'bytes=500-999'
    ]
  },
  {
    header: 'Referer',
    valueType: 'string',
    recommendedValues: [
      'https://www.example.com'
    ]
  },
  {
    header: 'Retry-After',
    valueType: 'string (date or seconds)',
    recommendedValues: [
      '3600'
    ]
  },
  {
    header: 'Strict-Transport-Security',
    valueType: 'string',
    recommendedValues: [
      'max-age=31536000; includeSubDomains'
    ]
  },
  {
    header: 'TE',
    valueType: 'string',
    recommendedValues: [
      'trailers, deflate'
    ]
  },
  {
    header: 'Trailer',
    valueType: 'string',
    recommendedValues: [
      'Max-Forwards'
    ]
  },
  {
    header: 'Transfer-Encoding',
    valueType: 'string',
    recommendedValues: [
      'chunked'
    ]
  },
  {
    header: 'Upgrade',
    valueType: 'string',
    recommendedValues: [
      'websocket'
    ]
  },
  {
    header: 'User-Agent',
    valueType: 'string',
    recommendedValues: [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'curl/7.68.0'
    ]
  },
  {
    header: 'Via',
    valueType: 'string',
    recommendedValues: [
      '1.1 example.com'
    ]
  },
  {
    header: 'Warning',
    valueType: 'string',
    recommendedValues: [
      '199 Miscellaneous warning'
    ]
  },
  {
    header: 'WWW-Authenticate',
    valueType: 'string',
    recommendedValues: [
      'Bearer realm="example", error="invalid_token", error_description="The access token expired"'
    ]
  },
  {
    header: 'X-API-Key',
    valueType: 'string',
    recommendedValues: [
      'your-api-key'
    ]
  },
  {
    header: 'X-Requested-With',
    valueType: 'string',
    recommendedValues: [
      'XMLHttpRequest'
    ]
  }
]

export default headers