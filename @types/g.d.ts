declare module "rollup-plugin-javascript-obfuscator";

interface JSOBoptions {
    compact?: boolean;
    controlFlowFlattening?: boolean;
    controlFlowFlatteningThreshold?: number;
    deadCodeInjection?: boolean;
    deadCodeInjectionThreshold?: number;
    debugProtection?: boolean;
    debugProtectionInterval?: boolean;
    disableConsoleOutput?: boolean;
    domainLock: Array<string>;
    forceTransformStrings: Array<string>;
    identifierNamesGenerator: string;
    identifiersDictionary: Array<string>;
    identifiersPrefix: string;
    inputFileName: string;
    log: boolean;
    numbersToExpressions: boolean;
    optionsPreset: string;
    renameGlobals: boolean;
    renameProperties: boolean;
    reservedNames: Array<string>;
    reservedStrings: Array<string>;
    rotateStringArray: boolean;
    seed: number;
    selfDefending: boolean;
    shuffleStringArray: boolean;
    simplify: boolean;
    sourceMap: boolean;
    sourceMapBaseUrl: string;
    sourceMapFileName: string;
    sourceMapMode: string;
    splitStrings: boolean;
    splitStringsChunkLength: number;
    stringArray: boolean;
    stringArrayEncoding: Array<string>;
    stringArrayWrappersCount: number;
    stringArrayWrappersChainedCalls: boolean;
    stringArrayWrappersType: string;
    stringArrayThreshold: number;
    target: string;
    transformObjectKeys: boolean;
    unicodeEscapeSequence: boolean;
}

type JSOBResult = {
    code: string;
    map: string;
}

export function javascriptObfuscator(options: JSOBoptions): JSOBResult;