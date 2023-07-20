#!/usr/bin/env node
import { CombinedActorInfo } from 'combined-actor-info';
import { loadFile, saveFile } from '..';
import { program } from 'commander'

program
    .description('Tool for converting Zelda TotK CombinedActorInfo Json format to cai')
    .requiredOption('-o, --out <fileOut>', 'Output filename')
    .argument('<fileIn>', 'Input json');


var p = program.parse(process.argv)

const programOpts: { out: string; } = program.opts()
const programArgs: string[] = p.processedArgs;

; (async (file: string, fileOut: string) => {
    var dataBuffer = loadFile(file);
    if (!dataBuffer) { return; }
    var cai = CombinedActorInfo.FromArrayBuffer(dataBuffer.buffer);
    saveFile(fileOut, cai, 'json');

})(programArgs[0], programOpts.out);
