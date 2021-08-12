const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const moment = require("moment-timezone");

// 从环境变量中获取数据库表名
const { TABLE_NAME, AWS_REGION } = process.env;

// 将Record写入表中
const addRecord = (record) => {
  let dynamodb = new DynamoDBClient({ region: AWS_REGION });
  // 获取当前时间
  let created = moment().tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:SS");
  let { username, key, results } = record;
  let command = new PutItemCommand({
    TableName: TABLE_NAME,
    // Item中的所有参数需要指定其数据类型
    // S表示String字符串
    Item: {
      key: { S: key },
      username: { S: username },
      results: { S: JSON.stringify(results) },
      created: { S: created }
    }
  });
  return dynamodb.send(command);
};

exports.handler = async(event, context) => {
  // Records为SQS事件中固定的消息键名
  // event的格式为：{ Records: [{}, {}] }
  let { Records: records } = event;
  for (let record of records) {
    // 只需要取消息主体内容
    let { body } = record;
    await addRecord(JSON.parse(body));
  }
};
