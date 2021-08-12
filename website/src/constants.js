// PicturBucket URL
const PICTURE_URL = "https://aws-object-detect-picture-bucket.s3.amazonaws.com";
// API Gateway URL
const API_URL = "https://aik01fw719.execute-api.us-east-1.amazonaws.com";
// Cognito
const CLIENT_ID = "544cfusfsumga6ehjrdr817551";
const USER_POOL_ID = "us-east-1_sHsI75IPU";
const ISS_URL = "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_sHsI75IPU";
const COGNITO_DOMAIN = "https://object-detect-app.auth.us-east-1.amazoncognito.com";

// Cognito URL 定义
const DIRECT_URL = (new URL(location)).origin;
const LOGIN_URL = `${COGNITO_DOMAIN}/login?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${DIRECT_URL}`;
const USER_INFO_URL = `${COGNITO_DOMAIN}/oauth2/userInfo`;
const LOGOUT_URL = `${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${DIRECT_URL}`;
