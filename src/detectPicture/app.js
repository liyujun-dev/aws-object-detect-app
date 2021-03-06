const { RekognitionClient, DetectLabelsCommand } = require("@aws-sdk/client-rekognition");
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const { BUCKET_NAME, QUEUE_URL, AWS_REGION } = process.env;

const response = (statusCode, data) => ({
  statusCode,
  body: JSON.stringify(data)
});

// 识别图像中的物体类别
const detect = (key) => {
  let rekognition = new RekognitionClient({ region: AWS_REGION });
  let command = new DetectLabelsCommand({
    Image: { // 指定图片位置
      S3Object: {
        Bucket: BUCKET_NAME,
        Name: key
      },
      MaxLabels: 10, // 最大返回标签数量
      MinConfidence: 75 // 最低返回准确率75%
    }
  });
  return rekognition.send(command);
}

// 将识别记录发送到Record Queue
const sendRecord = (record) => {
  let sqs = new SQSClient({ region: AWS_REGION });
  let command = new SendMessageCommand({
    MessageBody: JSON.stringify(record),
    QueueUrl: QUEUE_URL,
  });
  return sqs.send(command);
};

exports.handler = async(event) => {
  // 获取路由参数
  const { key } = event.queryStringParameters;
  if (key === undefined || key === "") {
    return response(400, { message: "参数key不能为空" });
  }
  // 获取username
  const { username } = event.requestContext.authorizer.jwt.claims;

  try {
    // 获取识别结果
    let { Labels: results } = await detect(key);
    // 将记录发送到队列中
    await sendRecord({ key, results, username });
    return response(200, { results });
  }
  catch (error) {
    return response(400, { message: `请检查${BUCKET_NAME}中是否存在${key}` });
  }
};
