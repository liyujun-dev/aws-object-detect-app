const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const { TABLE_NAME, AWS_REGION } = process.env;

const response = (statusCode, data) => ({
  statusCode,
  body: JSON.stringify(data)
});

// 获取RecordsTable表中的所有数据
const getRecords = () => {
  let dynamodb = new DynamoDBClient({ region: AWS_REGION });
  let command = new ScanCommand({
    TableName: TABLE_NAME
  });
  return dynamodb.send(command);
};

exports.handler = async() => {
  try {
    // 提取主要的数据
    let { Items: items, Count: count } = await getRecords();
    return response(200, { items, count });
  }
  catch (error) {
    return response(400, { message: "获取数据失败" });
  }
};
