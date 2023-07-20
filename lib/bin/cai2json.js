#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const combined_actor_info_1 = require("combined-actor-info");
const fs_1 = __importDefault(require("fs"));
const saveMagic = 16909060;
const [, , ...args] = process.argv;
const fileIn = args[0];
var fileOut = args.length > 1 ? args[1] : undefined;
var index = args.length > 2 ? args[2] : 1;
if (!isNaN(Number(fileOut))) {
    index = Number(fileOut);
    fileOut = undefined;
}
if (index === 0) {
    index = 1;
}
function load(fileIn) {
    if (!fs_1.default.existsSync(fileIn)) {
        console.log('File does not exist', fileIn);
        return;
    }
    try {
        var data = fs_1.default.readFileSync(fileIn);
        var dataBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
        if (data.readUInt32LE(0) === saveMagic) {
            var entry = combined_actor_info_1.CombinedActorInfo.FromSaveFileArrayBuffer(dataBuffer, Number(index));
            return entry;
        }
        else {
            var entry = combined_actor_info_1.CombinedActorInfo.FromArrayBuffer(dataBuffer);
            return entry;
        }
    }
    catch (error) {
        console.log(error);
    }
}
var actor = load(fileIn);
if (actor) {
    if (!fileOut) {
        console.log(combined_actor_info_1.CombinedActorInfo.ToJson(actor, true));
    }
    else {
        try {
            fs_1.default.writeFileSync(fileOut, combined_actor_info_1.CombinedActorInfo.ToJson(actor, true));
        }
        catch (error) {
            console.log(error);
        }
    }
}
