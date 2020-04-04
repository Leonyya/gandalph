import pkg from 'pkg'
const compile = pkg.exec
export async function BuildDesktopPayload(): Promise<any> {
    await compile([ 'builder/desktop/src/index.js', '--target', 'host', '--output', 'builder/desktop/build/bin/app' ])
}