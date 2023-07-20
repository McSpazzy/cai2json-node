import { CombinedActorInfo } from 'combined-actor-info';
import fs from 'fs';

export function loadFile(fileIn: string): Buffer | undefined {
    if (!fs.existsSync(fileIn)) {
        console.log('File does not exist', fileIn);
        return;
    }
    try {
        var data = fs.readFileSync(fileIn);
        var dataBuffer = Buffer.from(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
        return dataBuffer;
    } catch (error) {
        console.log(error)
    }
}

export function saveFile(fileOut: string, cai: CombinedActorInfo, format: 'cai' | 'json') {
    try {
        if (format === 'json') {
            fs.writeFileSync(fileOut, CombinedActorInfo.ToJson(cai, true));
        } else if (format === 'cai') {
            var data = CombinedActorInfo.ToArrayBuffer(cai);
            fs.writeFileSync(fileOut, Buffer.from(data));
        }
    } catch (error) {
        console.log(error)
    }
}
