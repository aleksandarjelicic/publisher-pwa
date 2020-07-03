const withPWA = require('next-pwa')
const path = require('path')

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})