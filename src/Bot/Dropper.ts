import rollup, { rollup as roll } from 'rollup';
import obfuscatorPlugin  from 'rollup-plugin-javascript-obfuscator';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import nodePolyfills from "rollup-plugin-node-polyfills";
export async function Dropper() {

    const inputOptions: rollup.InputOptions = { 
        input: 'src/Bot/Egg.ts',
        plugins: [
            typescript({
                lib: ["es6", "dom"], 
                target: "es5",
                tsconfig: false,
                "sourceMap": true,
                "esModuleInterop": true,
            }),
            resolve({
                browser: true
            }),
            commonjs(),
            obfuscatorPlugin({
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.75,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.4,
                debugProtection: false,
                debugProtectionInterval: false,
                disableConsoleOutput: true,
                identifierNamesGenerator: 'hexadecimal',
                log: false,
                numbersToExpressions: true,
                renameGlobals: false,
                rotateStringArray: true,
                selfDefending: true,
                shuffleStringArray: true,
                simplify: true,
                splitStrings: true,
                splitStringsChunkLength: 10,
                stringArray: true,
                stringArrayEncoding: ['base64'],
                stringArrayWrappersCount: 2,
                stringArrayWrappersChainedCalls: true,
                stringArrayWrappersType: 'variable',
                stringArrayThreshold: 0.75,
                transformObjectKeys: true,
                unicodeEscapeSequence: false
            })
        ],

    };
    const outputOptions: rollup.OutputOptions  = {
        format: "iife",
        dir: "bin/",
        plugins: [
            terser(),
        ],
        sourcemap: true,
    };

    let bundle;

    try {
        bundle = await roll(inputOptions);
        //console.log(bundle.watchFiles);
    } catch(e) {
        throw new Error(e)
    }


    const { output } = await bundle.generate(outputOptions);

    for (const chunkOrAsset of output) {
        if(chunkOrAsset.type === 'asset') console.log('Asset generated');
        else console.log('Chunk generated');
    }

    await bundle.write(outputOptions);
}