import rollup from 'rollup';
//import obfuscatorPlugin  from 'rollup-plugin-javascript-obfuscator';

const inputOptions = { 
    input: './Egg.ts',
    plugins: [
        /*obfuscatorPlugin({
            compact:true
        })*/
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