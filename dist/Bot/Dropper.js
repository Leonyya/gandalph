"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dropper = void 0;
const rollup_1 = require("rollup");
const rollup_plugin_javascript_obfuscator_1 = __importDefault(require("rollup-plugin-javascript-obfuscator"));
const plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
const plugin_typescript_1 = __importDefault(require("@rollup/plugin-typescript"));
const rollup_plugin_terser_1 = require("rollup-plugin-terser");
function Dropper() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputOptions = {
            input: 'src/Bot/Egg.ts',
            plugins: [
                plugin_typescript_1.default({
                    lib: ["es6", "dom"],
                    target: "es5",
                    tsconfig: false,
                    "sourceMap": true,
                    "esModuleInterop": true,
                }),
                plugin_node_resolve_1.default(),
                plugin_commonjs_1.default(),
                rollup_plugin_javascript_obfuscator_1.default({
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
        const outputOptions = {
            format: "iife",
            dir: "bin/",
            plugins: [
                rollup_plugin_terser_1.terser(),
            ],
            sourcemap: true
        };
        let bundle;
        try {
            bundle = yield rollup_1.rollup(inputOptions);
            //console.log(bundle.watchFiles);
        }
        catch (e) {
            throw new Error(e);
        }
        const { output } = yield bundle.generate(outputOptions);
        for (const chunkOrAsset of output) {
            if (chunkOrAsset.type === 'asset')
                console.log('Asset', chunkOrAsset);
            else
                console.log('Chunk', chunkOrAsset.modules);
        }
        yield bundle.write(outputOptions);
    });
}
exports.Dropper = Dropper;
//# sourceMappingURL=Dropper.js.map