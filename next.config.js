/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com']
    },
    experimental: {
        serverActions: true,
    },
    optimizeFonts: false,
}

module.exports = nextConfig
