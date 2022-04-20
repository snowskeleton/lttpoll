function PollPut(body) {
    return fetch(
        "https://6x0en74zod.execute-api.us-east-2.amazonaws.com/polls", {
        "method": "PUT",
        "headers": {
        "content-type": "application/json",
        },
        "body": JSON.stringify({body})
    });
}

export default PollPut;
