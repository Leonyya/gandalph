const withProgressBar = require('next-progressbar')
module.exports = withProgressBar({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    return config
  }
})
