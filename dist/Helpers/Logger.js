"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
function Log(value) {
    console.log(value);
    return function (log) {
        console.log(log);
    };
}
exports.Log = Log;
//# sourceMappingURL=Logger.js.map