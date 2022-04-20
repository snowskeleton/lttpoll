import NewID from './IDGenerator'

function BuildBody(name, options) {
        // Currently, uids are base64 encoded strings containing
        // the object name and current timestamp.
        // TODO: move uid generation server-side
    const choices = [
        // TODO: find some way to support variable amounts of options
        { id: NewID(options[0]), text: options[0], votes: 0, },
        { id: NewID(options[1]), text: options[1], votes: 0, },
    ]
    const body = {
        id: NewID(name),
        name: name,
        options: choices
    }
    return JSON.stringify(body)
}

export default BuildBody;
