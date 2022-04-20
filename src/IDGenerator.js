import { Buffer } from 'buffer';
function NewID(seed) {
    const pt = (seed + Date.now())
    return Buffer.from(pt).toString('base64')
}

export default NewID
