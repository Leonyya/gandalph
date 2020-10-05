const rollup = require('rollup');
const obfuscatorPlugin = require('rollup-plugin-javascript-obfuscator');

const inputOptions = { 
    input: './egg',
    plugins: [
        obfuscatorPlugin({
            compact:true
        })
    ]
};
const outputOptions = { };

module.exports = async function BuildJSPayload() {
    const bundle = await rollup.rollup(inputOptions);
    console.log(bundle.watchFiles);

    const { output } = await bundle.generate(outputOptions);

    for (const chunkOrAsset of output) {
        if(chunkOrAsset.type === 'asset') console.log('Asset', chunkOrAsset);
        else console.log('Chunk', chunkOrAsset.modules);
    }

    await bundle.write(outputOptions);
}