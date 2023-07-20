/// <reference types="node" />
import { CombinedActorInfo } from 'combined-actor-info';
export declare function loadFile(fileIn: string): Buffer | undefined;
export declare function saveFile(fileOut: string, cai: CombinedActorInfo, format: 'cbi' | 'json'): void;
