#!/usr/bin/env node
import { CombinedActorInfo } from 'combined-actor-info';
import fs from 'fs';

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

function load(fileIn: string): CombinedActorInfo | undefined {
    if (!fs.existsSync(fileIn)) {
        console.log('File does not exist', fileIn);
        return;
    }
    try {
        var data = fs.readFileSync(fileIn);
        var dataBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
        if (data.readUInt32LE(0) === saveMagic) {
            var entry = CombinedActorInfo.FromSaveFileArrayBuffer(dataBuffer, Number(index));
            return entry;
        } else {
            var entry = CombinedActorInfo.FromArrayBuffer(dataBuffer);
            return entry;
        }

    } catch (error) {
        console.log(error)
    }
}

var actor = load(fileIn);
if (actor) {
    if (!fileOut) {
        console.log(CombinedActorInfo.ToJson(actor, true))
    } else {
        try {
            fs.writeFileSync(fileOut, CombinedActorInfo.ToJson(actor, true));
        } catch (error) {
            console.log(error)
        }
    }
}
