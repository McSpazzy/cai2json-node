#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const combined_actor_info_1 = require("combined-actor-info");
const fs_1 = __importDefault(require("fs"));
const [, , ...args] = process.argv;
const fileIn = args[0];
const fileOut = args.length > 1 ? args[1] : undefined;
function load(fileIn) {
    if (!fs_1.default.existsSync(fileIn)) {
        console.log('File does not exist', fileIn);
        return;
    }
    try {
        var data = fs_1.default.readFileSync(fileIn);
        var entry = combined_actor_info_1.CombinedActorInfo.FromArrayBuffer(data.buffer);
        return entry;
    }
    catch (error) {
        console.log(error);
    }
}
var actor = load(fileIn);
if (actor) {
    if (!fileOut) {
        console.log('Must Specify Output File');
    }
    else {
        try {
            var data = combined_actor_info_1.CombinedActorInfo.ToArrayBuffer(actor);
            fs_1.default.writeFileSync(fileOut, new DataView(data));
        }
        catch (error) {
            console.log(error);
        }
    }
}
