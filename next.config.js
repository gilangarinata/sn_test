/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'utfs.io', 'sesna.id', 'img.youtube.com']
    },
    optimizeFonts: false,
    compress: false,
    compiler: {
        removeConsole: false,
    },
}

module.exports = nextConfig
