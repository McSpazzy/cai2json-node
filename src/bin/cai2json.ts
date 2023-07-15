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
        var entry = CombinedActorInfo.FromArrayBuffer(data.buffer);
        return entry;
    } catch (error) {
        console.log(error)
    }
}

var actor = load(fileIn);
if (actor) {
    if (!fileOut) {
        console.log(actor.ToJson(true))
    } else {
        try {
            fs.writeFileSync(fileOut, actor.ToJson(true));
        } catch (error) {
            console.log(error)
        }
    }
}
