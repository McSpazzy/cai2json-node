#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const combined_actor_info_1 = require("combined-actor-info");
const base_1 = require("./base");
const commander_1 = require("commander");
commander_1.program
    .description('Tool for converting Zelda TotK CombinedActorInfo Json format to cai')
    .requiredOption('-o, --out <fileOut>', 'Output filename')
    .argument('<fileIn>', 'Input json');
var p = commander_1.program.parse(process.argv);
const programOpts = commander_1.program.opts();
const programArgs = p.processedArgs;
;
(async (file, fileOut) => {
    var dataBuffer = (0, base_1.loadFile)(file);
    if (!dataBuffer) {
        return;
    }
    var cai = combined_actor_info_1.CombinedActorInfo.FromArrayBuffer(dataBuffer.buffer);
    (0, base_1.saveFile)(fileOut, cai, 'cai');
})(programArgs[0], programOpts.out);
