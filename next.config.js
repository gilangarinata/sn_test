/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'utfs.io', 'sesna.id']
    },
    experimental: {
        serverActions: true,
    },
    optimizeFonts: false,
}

module.exports = nextConfig
