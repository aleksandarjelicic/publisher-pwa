const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const path = require('path')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})