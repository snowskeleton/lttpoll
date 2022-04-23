const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    if (event.routeKey != 'PUT /poll')
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    console.log(event);
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    };

    var body = JSON.parse(event.body);
    var optionIDs = []

        for (let i = 0; i < body.options.length; i++) {
            optionIDs.push(body.options[i].id)
        }

    try {
        await dynamo
            .put({
                TableName: "polls",
                Item: {
                    id: body.id, // TODO: generate this server-side
                    name: body.name,
                    options: optionIDs
                }
            })
            .promise();
        for (let i = 0; i < body.options.length; i++) {
            await dynamo
                .put({
                    TableName: "polls",
                    Item: {
                        id: body.options[i].id, // TODO: generate this server-side
                        text: body.options[i].text,
                        votes: body.options[i].votes,
                    }
                })
                .promise();
        }
        body = `PUT item ${JSON.stringify(body)}`;
        console.log(body);
    } catch (err) {
        statusCode = 400;
        body = err.message;
        body.par = event
    } finally {
        body = JSON.stringify(body);
        // console.log(body);
    }

    return {
        statusCode,
        headers,
        body,
    };
};
