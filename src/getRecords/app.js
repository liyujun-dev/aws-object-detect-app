const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");

const { TABLE_NAME, AWS_REGION } = process.env;

const response = (statusCode, data) => ({
  statusCode,
  body: JSON.stringify(data)
});

// 按照username的值获取Records
const getRecords = (username) => {
  let dynamodb = new DynamoDBClient({ region: AWS_REGION });
  let command = new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: "username = :u",
    ExpressionAttributeValues: {
      ":u": {
        S: username
      }
    },
  });
  return dynamodb.send(command);
};

exports.handler = async(event) => {
  // 获取username
  const { username } = event.requestContext.authorizer.jwt.claims;
  try {
    // 提取主要的数据
    let { Items: items, Count: count } = await getRecords(username);
    return response(200, { items, count });
  }
  catch (error) {
    return response(400, { message: "获取数据失败" });
  }
};
