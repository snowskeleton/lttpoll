const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    if (event.routeKey != 'GET /poll/{pollID}')
        throw new Error(`Unsupported route: "${event.routeKey}"`);

    var [statusCode, body] = [200, ''];
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    };

    const pollParams = {
        TableName: "polls",
        Key: {
            id: event.pathParameters.pollID,
        },
    };

    try {
        body = await dynamo
            .get(pollParams)
            .promise();
        body = body.Item;
    } catch (err) {
        statusCode = 400;
        console.log(err.message);
        body = err.message;
    }

    try {
        var count = 0;
        for (let i = 0; i < body.options.length; i++) {
            const optParams = {
                TableName: "polls",
                KeyConditionExpression: "id = :id",
                ExpressionAttributeValues: {
                    ":id": body.options[i]
                },
            };
            count++;
            body.options[i] = await dynamo
                .query(optParams)
                .promise();
            body.options[i] = body.options[i].Items[0];
        }
    } catch (err) {
        statusCode = 400;
        console.log(err.message);
        body = err.message + '\n' + JSON.stringify(body) + '\n' + count;
    } finally {
        // body = JSON.stringify(body);
        console.log(body, count);
        // console.log(event, context, body, count);
    }

    return {
        // statusCode,
        //this returns a 500 error any time I try to include a status code.
        //works fine without a code.
        //something something, best code is the code you don't write.
        // headers,
        body,
    };
};
