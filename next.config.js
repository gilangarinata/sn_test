/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'utfs.io', 'sesna.id', 'img.youtube.com', 'www.sesna.id']
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['https://sesna.id', 'https://www.sesna.id', 'https://utfs.io', 'https://www.utfs.io','http://localhost:3010','127.0.0.1:3010', 'http://127.0.0.1:3010', 'sesna.id'],
            bodySizeLimit: '50mb',
        },
    },
    optimizeFonts: false,
    compress: false,
    compiler: {
        removeConsole: false,
    },
}

module.exports = nextConfig
