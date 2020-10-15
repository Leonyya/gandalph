const pkg = require('pkg')
const compile = pkg.exec
export default async function BuildDesktopPayload(packet: any, cb: any) {
    await compile([ 'builder/desktop/src/index.js', 
                    '--target', 
                    'host', 
                    '--output', 
                    'builder/desktop/build/bin/app' 
                ])
}