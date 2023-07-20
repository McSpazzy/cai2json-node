#!/usr/bin/env node
import { CombinedActorInfo } from 'combined-actor-info';
import { loadFile, saveFile } from '..';
import { program } from 'commander'

program
    .description('Tool for converting Zelda TotK CombinedActorInfo format to json')
    .option('-o, --out [fileOut]', 'Output filename')
    .option('-i, --index [index]', 'AutoBuild index if using progress.sav')
    .argument('<fileIn>', 'Input cai/save');

var p = program.parse(process.argv)

const programOpts: { out?: string; index: number } = program.opts()
const programArgs: string[] = p.processedArgs;

; (async (file: string, fileOut: string, index: number) => {
    var dataBuffer = loadFile(file);
    if (!dataBuffer) { return; }
    var cai: CombinedActorInfo;
    if (dataBuffer.readUInt32LE(0) === 16909060) {
        if (index < 1) { index = 1; }
        if (index > 30) { index = 1; }
        cai = CombinedActorInfo.FromSaveFileArrayBuffer(dataBuffer.buffer, Number(index));
    } else {
        cai = CombinedActorInfo.FromArrayBuffer(dataBuffer.buffer);
    }

    if (fileOut === '') {
        console.log(CombinedActorInfo.ToJson(cai, true))
    } else {
        saveFile(fileOut, cai, 'json');
    }

})(programArgs[0], programOpts.out ?? '', programOpts.index);
