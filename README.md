# AWS Object Detect App

## 快速使用

1. 获取项目并安装依赖

   ```bash
   git clone https://github.com/suricatta1998/aws-object-detect-app.git
   cd aws-object-detect-app && npx recursive-install
   ```

2. 构建、打包并部署。

   ```bash
   sam build
   // 创建存储桶
   aws s3 mb s3://aws-object-detect-app
   sam package \
       --template-file template.yaml \
       --s3-bucket aws-object-detect-app \
       --output-template-file packaged.yaml

   sam deploy \
       --template-file packaged.yaml \
       --stack-name aws-object-detect-app \
       --capabilities CAPABILITY_IAM
   ```

3. 编辑`aws-object-detect-app/website/src/constants.js`，设定必要的常量。

   ```js
   // Picture Bucket URL
   const PICTURE_URL = "";
   // Object Detect Api Endpoint URL
   const API_URL = "";
   // Object Detect App Client Id
   const CLIENT_ID = "";
   // Object Detect App User Pool Id
   const USER_POOL_ID = "";
   // ISS URL
   const ISS_URL = "";
   // Object Detect App User Pool Domain
   const COGNITO_DOMAIN = "";
   ```

4. 将静态网页上传到存储桶中。

   ```bash
   cd website
   aws s3 cp \
       src \
       s3://object-detect-app-website-bucket \
       --recursive
       --exclude=node_modules
   ```
