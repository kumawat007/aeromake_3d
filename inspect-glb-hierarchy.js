import { readFileSync } from 'node:fs';

const fileBuffer = readFileSync('client/public/Drone.glb');
const jsonChunkLength = fileBuffer.readUInt32LE(12);
const jsonBuffer = fileBuffer.subarray(20, 20 + jsonChunkLength);
const json = JSON.parse(jsonBuffer.toString('utf8'));

console.log('--- GLB Hierarchy ---');

function printNode(nodeIndex, depth = 0) {
    const node = json.nodes[nodeIndex];
    const indent = '  '.repeat(depth);
    console.log(`${indent}- ${node.name || 'Unnamed'} (Index: ${nodeIndex})`);

    if (node.children) {
        node.children.forEach(childIndex => printNode(childIndex, depth + 1));
    }
}

const rootNodes = json.scenes[json.scene || 0].nodes;
rootNodes.forEach(nodeIndex => printNode(nodeIndex));
