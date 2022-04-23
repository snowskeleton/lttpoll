const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    if (event.routeKey != 'PATCH /option/{optionID}')
        throw new Error(`Unsupported route: "${event.routeKey}"`);

    console.log(event)
    var [statusCode, body] = [200, ''];
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    };

    const params = {
        TableName: "polls",
        Key: { "id": event.pathParameters.optionID },
        ExpressionAttributeValues: {
            ":inc": 1,
        },
        UpdateExpression: "SET votes = votes + :inc",
    }

    try {
        body = await dynamo.update(params)
            .promise();
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
        console.log(event, context, body)
    }

    return {
        statusCode,
        body,
        headers
    };
};
