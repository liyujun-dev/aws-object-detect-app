const { RekognitionClient, DetectLabelsCommand } = require("@aws-sdk/client-rekognition");

const { BUCKET_NAME, AWS_REGION } = process.env;

const client = new RekognitionClient({ region: AWS_REGION });
const response = (statusCode, data) => ({
  statusCode,
  body: JSON.stringify(data)
});

exports.handler = async(event, context) => {
  // 获取路由参数
  const { key } = event.queryStringParameters;
  if (key === undefined || key === "") {
    return response(400, { message: "参数key不能为空" });
  }

  const command = new DetectLabelsCommand({
    Image: { // 指定图片位置
      S3Object: {
        Bucket: BUCKET_NAME,
        Name: key
      },
      MaxLabels: 10, // 最大返回标签数量
      MinConfidence: 75 // 最低返回准确率75%
    }
  });

  try {
    // 获取识别结果
    let { Labels } = await client.send(command);
    return response(200, { results: Labels });
  }
  catch (error) {
    return response(400, { message: `请检查${BUCKET_NAME}中是否存在${key}` });
  }
}
