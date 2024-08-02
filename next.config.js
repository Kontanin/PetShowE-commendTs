/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/api/list',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/pdf',
            },
          ],
        },
      ]
    },
  }
  
  module.exports = nextConfig