const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    if (event.routeKey != 'GET /votes/{ids}')
        throw new Error(`Unsupported route: "${event.routeKey}"`);

    var [statusCode, body] = [200, ''];
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    };
    const [a, b] = event.pathParameters.ids.split('&');
    const params = [];
    console.log('logging params', params)
    params.push( {
        TableName: "polls",
        Key: { id: a }
    });
    params.push( {
        TableName: "polls",
        Key: { id: b }
    });

    body = [];
    for (let i = 0; i < params.length; i++) {
        const ans = await dynamo
            .get(params[i])
            .promise();
        body.push(ans.Item);

    }
    try {
    } catch (err) {
        statusCode = 400;
        console.log(err.message);
        body = err.message;
        body = err.message + '\n' + JSON.stringify(body) + '\n';
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
