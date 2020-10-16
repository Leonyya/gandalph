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
const rollup_1 = __importDefault(require("rollup"));
//import obfuscatorPlugin  from 'rollup-plugin-javascript-obfuscator';
const inputOptions = {
    input: './Egg.ts',
    plugins: [
    /*obfuscatorPlugin({
        compact:true
    })*/
    ]
};
const outputOptions = {};
module.exports = function BuildJSPayload() {
    return __awaiter(this, void 0, void 0, function* () {
        const bundle = yield rollup_1.default.rollup(inputOptions);
        console.log(bundle.watchFiles);
        const { output } = yield bundle.generate(outputOptions);
        for (const chunkOrAsset of output) {
            if (chunkOrAsset.type === 'asset')
                console.log('Asset', chunkOrAsset);
            else
                console.log('Chunk', chunkOrAsset.modules);
        }
        yield bundle.write(outputOptions);
    });
};
//# sourceMappingURL=Dropper.js.map