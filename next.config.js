/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'utfs.io', 'sesna.id', 'img.youtube.com']
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['https://sesna.id', 'https://www.sesna.id', 'https://utfs.io', 'https://www.utfs.io','http://localhost:3010'],
        },
    },
    optimizeFonts: false,
    compress: false,
    compiler: {
        removeConsole: false,
    },
}

module.exports = nextConfig
