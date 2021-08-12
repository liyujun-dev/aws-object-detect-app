////////////////////
////   用户验证   ///
///////////////////

// 获取url params
const getQueries = (str) => {
  let params = str.split("&");
  let queries = {};
  params.forEach((param) => {
    let [key, value] = param.split("=");
    queries[key] = value;
  });
  return queries;
};

// 跳转到登录页面
const toLogin = () => (location.href = LOGIN_URL);

// 存储token
const store = (queries) => {
  let { access_token, id_token } = queries;
  localStorage.setItem("accessToken", access_token);
  localStorage.setItem("idToken", id_token);
};

// 判断token是否过期
const isExpired = (exp_timestamp) => {
  let timestamp = Date.parse(new Date());
  return timestamp > exp_timestamp * 1000;
};

// 验证token合法性
const verifyToken = (token) => {
  let decoded = jwt_decode(token);
  let { client_id, exp, iss } = decoded;
  return client_id === CLIENT_ID && iss === ISS_URL && !isExpired(exp);
};

// 验证localStorage中的token合法性
const verifyLocal = () => {
  let accessToken = localStorage.getItem("accessToken");
  return accessToken && verifyToken(accessToken);
};

// 验证url中params的token合法性
const verifyQueries = (queries) => {
  return "access_token" in queries && "id_token" in queries;
};

// 主要逻辑
const url = new URL(location);
if (url.hash !== "" || verifyLocal()) {
  // 若url中存在或者localStorage中的token都能通过验证
  let queries = getQueries(url.hash.substr(1));
  if (verifyQueries(queries)) {
    // 若url中的token已通过验证
    // 存储token
    store(queries);
  }
} else {
  // url和localStorage中的token不存在或者没通过验证。
  toLogin(); // 跳转到登录页
}
