/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    endpoint: 'www.localhost:5000',
  },
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
    ];
  },
};

module.exports = nextConfig;
