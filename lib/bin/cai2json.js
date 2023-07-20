#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const combined_actor_info_1 = require("combined-actor-info");
const __1 = require("..");
const commander_1 = require("commander");
commander_1.program
    .description('Tool for converting Zelda TotK CombinedActorInfo format to json')
    .option('-o, --out [fileOut]', 'Output filename')
    .option('-i, --index [index]', 'AutoBuild index if using progress.sav')
    .argument('<fileIn>', 'Input cai/save');
var p = commander_1.program.parse(process.argv);
const programOpts = commander_1.program.opts();
const programArgs = p.processedArgs;
;
(async (file, fileOut, index) => {
    var dataBuffer = (0, __1.loadFile)(file);
    if (!dataBuffer) {
        return;
    }
    var cai;
    if (dataBuffer.readUInt32LE(0) === 16909060) {
        if (index < 1) {
            index = 1;
        }
        if (index > 30) {
            index = 1;
        }
        cai = combined_actor_info_1.CombinedActorInfo.FromSaveFileArrayBuffer(dataBuffer.buffer, Number(index));
    }
    else {
        cai = combined_actor_info_1.CombinedActorInfo.FromArrayBuffer(dataBuffer.buffer);
    }
    if (fileOut === '') {
        console.log(combined_actor_info_1.CombinedActorInfo.ToJson(cai, true));
    }
    else {
        (0, __1.saveFile)(fileOut, cai, 'json');
    }
})(programArgs[0], programOpts.out ?? '', programOpts.index);
