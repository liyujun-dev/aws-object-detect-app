// PicturBucket URL
const PICTURE_URL = "";
// API Gateway URL
const API_URL = "";
// Cognito
const CLIENT_ID = "";
const USER_POOL_ID = "";
const ISS_URL = "";
const CONITO_DOMAIN = "";

// Cognito URL 定义
const DIRECT_URL = (new URL(location)).origin;
const LOGIN_URL = `${CONITO_DOMAIN}/login?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${DIRECT_URL}`;
const USER_INFO_URL = `${CONITO_DOMAIN}/oauth2/userInfo`;
const LOGOUT_URL = `${CONITO_DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${DIRECT_URL}`;