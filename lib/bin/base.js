"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = exports.loadFile = void 0;
const combined_actor_info_1 = require("combined-actor-info");
const fs_1 = __importDefault(require("fs"));
function loadFile(fileIn) {
    if (!fs_1.default.existsSync(fileIn)) {
        console.log('File does not exist', fileIn);
        return;
    }
    try {
        var data = fs_1.default.readFileSync(fileIn);
        var dataBuffer = Buffer.from(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
        return dataBuffer;
    }
    catch (error) {
        console.log(error);
    }
}
exports.loadFile = loadFile;
function saveFile(fileOut, cai, format) {
    try {
        if (format === 'json') {
            fs_1.default.writeFileSync(fileOut, combined_actor_info_1.CombinedActorInfo.ToJson(cai, true));
        }
        else if (format === 'cai') {
            var data = combined_actor_info_1.CombinedActorInfo.ToArrayBuffer(cai);
            fs_1.default.writeFileSync(fileOut, Buffer.from(data));
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.saveFile = saveFile;
