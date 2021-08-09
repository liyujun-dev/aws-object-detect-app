const { v4: uuidv4 } = require("uuid");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// 我们将存储桶名称和所在区域作为外部环境变量获取
const { BUCKET_NAME, AWS_REGION } = process.env;
// 设定Signed URL过期时间为5分钟
const EXPIRE_SECONDS = 5 * 60;
const client = new S3Client({ region: AWS_REGION });

// 使用uuid生成唯一Object名称
const generateObjectName = () => uuidv4().replace(/-/g, "");

// Lambda函数入口
exports.handler = async() => {
    const key = `${generateObjectName()}.jpg`;
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: "image/jpeg"
    });

    // 指定PutObject命令，获取Put Object类型的Signed URL
    // 意味着可以通过Put请求Signed URL上传图片到存储桶
    const uploadUrl = await getSignedUrl(
        client,
        command, { expiresIn: EXPIRE_SECONDS }
    );
    return JSON.stringify({ uploadUrl, key });
};
