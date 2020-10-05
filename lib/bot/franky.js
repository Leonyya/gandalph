const pkg = require('pkg')
const compile = pkg.exec
module.exports = async function BuildDesktopPayload(packet, cb) {
    await compile([ 'builder/desktop/src/index.js', '--target', 'host', '--output', 'builder/desktop/build/bin/app' ])
}