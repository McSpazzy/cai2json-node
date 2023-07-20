#!/usr/bin/env node
import { CombinedActorInfo } from 'combined-actor-info';
import fs from 'fs';

const [, , ...args] = process.argv;

const fileIn = args[0];
const fileOut = args.length > 1 ? args[1] : undefined;

function load(fileIn: string): CombinedActorInfo | undefined {
    if (!fs.existsSync(fileIn)) {
        console.log('File does not exist', fileIn);
        return;
    }
    try {
        var data = fs.readFileSync(fileIn);
        var dataBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
        var entry = CombinedActorInfo.FromArrayBuffer(dataBuffer);
        return entry;
    } catch (error) {
        console.log(error)
    }
}

var actor = load(fileIn);
if (actor) {
    if (!fileOut) {
        console.log('Must Specify Output File')
    } else {
        try {
            var data = CombinedActorInfo.ToArrayBuffer(actor);
            fs.writeFileSync(fileOut, new DataView(data));
        } catch (error) {
            console.log(error)
        }
    }
}
