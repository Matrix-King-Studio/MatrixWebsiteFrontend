import axios from "axios";
axios.defaults.baseURL = "/dai";
var instance = axios.create({ timeout: 1000 * 12 });
instance.interceptors.response.use((res) => {
  return res.data;
});


// let get=instance.get
let post = instance.post;
let user = {
  // 登录
  login(data) {
    return post("/user/login", data);
  },
  // 注册
  register(data) {
    return post("/user/register", data);
  },
  //  发送验证码到qq邮箱
  emailSend(qqStr) {
    return post("/user/emailSend", { qqStr });
  },
  // 邮箱验证码验证
  emailVertify(emailCode, emailKey) {
    return post("/user/emailVertify", {
      emailCode,
      emailKey
    });
  },
  //  用户改密码
  changePassword(data) {
    return post("/user/changePassword", data);
  },
};
let httpWeChat = {
  getState() {
    return post("/wechat/getState");
  },
  callback(data) {
    return post("/wechat/callback", data);
  },
  getUserInfo(openid) {
    return post("/wechat/getUserInfoByOpenId", { openid });
  },
  bind(data) {
    return post("/wechat/bind", data);
  },
  
}
export { user, httpWeChat };
