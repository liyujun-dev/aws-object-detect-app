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

// Cognito URL 定义
const DIRECT_URL = `${(new URL(location)).origin}/index.html`;
const LOGIN_URL = `${COGNITO_DOMAIN}/login?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${DIRECT_URL}`;
const USER_INFO_URL = `${COGNITO_DOMAIN}/oauth2/userInfo`;
const LOGOUT_URL = `${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${DIRECT_URL}`;
