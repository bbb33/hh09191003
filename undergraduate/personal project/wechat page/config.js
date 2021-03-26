//小程序配置文件
var apiUrl = "http://127.0.0.1/thinkphp_3.2.3_full/index.php/Home"//本地后台
var uploadUrl = "http://127.0.0.1/thinkphp_3.2.3_full/Uploads/Picture"
// var apiUrl = "http://192.168.1.3/thinkphp_3.2.3_full/index.php/Home"//本地后台

// var apiUrl = "https://svnandhjz.applinzi.com/index.php/Api"//自己创建的云平台的后台
var appid = "wxfb191352493e1fa1"

var config = {
  apiUrl,
  appid,
  wxUrl: `${apiUrl}/Weixin/`,
  userUrl: `${apiUrl}/User/`,
  imgUrl: `${apiUrl}/Img/`,
  chartUrl: `${apiUrl}/Charts/`,
};
module.exports = config