var crypto = require('crypto');
//var request = require('request');
//var config = require('../lib/config/config');
var config = {};
var redis = require("redis");
//var redisclient = redis.createClient(config.redis.port,config.redis.host);redisclient.auth(config.redis.pass);
var fs = require('fs');
exports.encrypt = function(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

exports.decrypt = function(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

/**
 * Md5加密算法
 */
exports.md5 = function(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str,'utf8');
  str = md5sum.digest('hex');
  return str;
}

/**
 * SHA1加密算法
 */
exports.sha1 = function(str) {
  var md5sum = crypto.createHash('sha1');
  md5sum.update(str);
  str = md5sum.digest('hex');
  console.log(str)
  return str;
}
/**
 * base64 加密算法
 */
exports.base64encode = function(str) {
  str = new Buffer(str);
  str = str.toString('base64');
  //  console.log('base64encode',str);
  return str;
}
/**
 * base64 解密算法
 */
exports.base64decode = function(str) {
  var b = new Buffer(str, 'base64')
  var str = b.toString();
  // console.log('base64decode',str);
  return str;
}
/**
 * redis set
 * common.setredis("name",'xiaosan2');
 */
exports.setredis = function(key, value) {
  redisclient.set(config.redis['prefix']+key, value, redis.print);
}
/**
 * redis get
 *common.getredis("name",function(err,data){});
 */
exports.getredis = function(key,cb) {
  redisclient.get(config.redis['prefix']+key,cb);
  /*    var a = '';
   redisclient.get(key, function(err, reply){
   var reply = JSON.parse(reply);
   console.log('get',reply);
   a =JSON.parse(reply);
   });
   return a;a*/
}





exports.randomString = function(size) {
  size = size || 6;
  var code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var max_num = code_string.length + 1;
  var new_pass = '';
  while (size > 0) {
    new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
    size--;
  }
  return new_pass;
}


/**
 * 判断登录状态，从session中获取用户信息
 * @param req  request对象作为参数传递
 * @author baojun
 * @returns {userInfo|*|.session.userInfo}
 */
exports.getUserInfo = function(req) {
  //检查用户登录session是否存在，如果用户在活动状态
  //则重新设置session过期时间，如果用户3小时之内不曾活动，则退出登录
  var userInfo = req.session.userInfo || false;
  if(userInfo){
    req.session.userInfo = userInfo;
  }
  return userInfo;
}

/**
 * 登录拦截，如果用户未登录，则跳转到登录页面
 * @author baojun
 * @param req
 * @param res
 * @param next
 */
exports.authorize = function(req, res, next) {
  var url = req.originalUrl;
  if (!req.session.userInfo) {
    res.redirect('/login?url=' + url);
  } else {
    next();
  }
}

/**
 * 发送邮件
 * @author baojun
 * @date 2014-08-08
 */
exports.sendEmail = function (address, title, content, next) {
  var r = request.post('http://api.haoxiangmu.com/mail/sendemail', function optionalCallback (err, httpResponse, body) {
    if (err) {
      return console.error('failed:', err);
    }
    console.log('API post successful!  Server responded with:', body);
    next(body);
  });
  var form = r.form();
  form.append('address', address);
  form.append('title', title);
  form.append('content', content);


//    form.append('my_file', fs.createReadStream(path.join(__dirname, 'doodle.png')));
//    form.append('remote_file', request('http://google.com/doodle.png'));


//    var body = {
//        address : 'zhanghubery@163.com',
//        title : 'title',
//        content : 'content'
//    };
//
//    var options = {
//        url : 'http://api.haoxiangmu.com/mail/sendemail',
//        qs : body,
//        headers : {enctype:'multipart/form-data'}
//    };
//
//    request.post(options, function(err, res, body){
//        console.log(body);
//    });

}
/**
 * 发送短信
 * @author tianliang
 * @date 2015-11-26
 */
exports.sendSms = function (mobile,content,  next) {
  var mdsms = config.mdsms;
  // var ext = ext ? ext : '';//ext = 1 签名【投一手】，默认为空，签名【好项目】
  var r = request.get('http://sdk2.entinfo.cn:8061/mdsmssend.ashx', function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('failed:', err);
    }
    console.log('API post successful!  Server responded with:', body);
    var state = JSON.stringify({msg:'ok'});
    next(state);
  });
  var form = r.form();
  form.append('sn', mdsms.sn);
  //form.append('pwd', 'D1C5738C8C6B860EBF28BD5DC1F8CF9B');
  form.append('pwd', mdsms.pwd);
  form.append('mobile', mobile);
  form.append('content', '【投一手】'+content);
  form.append('ext', 1);
  form.append('key', mobile);  //接口验证，已弃用，先传递，以后再改

}
/**
 * 生成六位随机数
 * @author baojun
 * @date 2014-08-08
 */
exports.MathRand = function(sum)
{
  var Num="";
  for(var i=0; i < sum; i++)
  {
    Num += Math.floor(Math.random() * 10);
  }
  return Num;
}

/**
 * 验证手机号码
 */
exports.validatemobile = function(account)
{
  if(account.length==0)
  {
    return false;
  }
  var reg = /^(((1[0-9][0-9]{1})|159|153|170)+\d{8})$/;
  if(!reg.test(account))
  {
    return false;
  }
  return true;
}

/**
 * 验证邮箱地址
 */
exports.validateemail = function(account)
{
  if(account.length==0)
  {
    return false;
  }
  var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  if(!reg.test(account)){
    return false;
  }
  return true;
}

exports.checkChinese = function(value){
  if (/^[\u4e00-\u9fa5]+$/.test(value)) {
    return true;
  }
  return false;
}

exports.accMul = function(arg1,arg2){
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

/**
 * sql limit语句
 * @param int $page
 * @param int $pagesize
 * @return limit 1 / limit *,*
 */
exports.getSqlLimit = function(page, pagesize)
{
  var limit = ' limit 1';
  if (page > 0 && pagesize > 0)
  {
    page = parseInt(page) ? parseInt(page) : 1;
    pagesize = parseInt(pagesize) ? parseInt(pagesize) : 10;
    start = (page - 1) * pagesize;
    limit = ' limit ' + start + ',' + pagesize;

  }
  return limit;
}


/**
 * 验证一个元素在数组中是否存在
 */
exports.contains = function(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}

/**
 * 获取分页
 * @param page 当前页码
 * @param totalpage 总页数
 */
exports.pagination = function(page, totalpage, url){
  var size = 5,left = 2,right = 2;
  var start = 1;
  var end = start + left + right;

  if(page > left){
    start = page - left;
  }
  if(page + right > totalpage){
    start = totalpage - left - right > 0 ? totalpage - left - right : 1;
  }

  if(start + left + right > totalpage){
    end = totalpage;
  }else{
    end = start + left + right;
  }

  var pre = page - 1;
  var next = page + 1;
  var html = '<ul class="pagination pagination-lg">';

//    console.log(page);
  if(page > 1 && totalpage > size){
    html += '<li><a href="' + url + 1 + '">&laquo;</a></li>';
    html += '<li><a href="' + url + pre + '">&lsaquo;</a></li>';
  }

  for (var i = start; i <= end; i++){
    var str = ''
    if(i == page){
      str = '  class="active"';
    }
    html += '<li' + str + '><a href="' + url + i + '">' + i + '</a></li>';
  }

  if(page < totalpage && totalpage > size){
    html += '<li><a href="' + url + next + '">&rsaquo;</a></li>';
    html += '<li><a href="' + url + totalpage + '">&raquo;</a></li>';
  }

  html += '</ul>';

  return html;
}

/**
 * 得到分页信息数据
 * @param page  当前页码
 * @param pagesize  每页条数
 * @param count  总共条数
 * @returns {*}
 */
exports.getPageInfo = function(page, pagesize, count) {
  page = parseInt(page);
  pagesize = parseInt(pagesize);
  count = parseInt(count);
  var pageInfo = [];
  pageInfo['page'] = page;
  pageInfo['pagesize'] = pagesize;
  pageInfo['total'] = count;
  pageInfo['totalpage'] = pagesize ? (count % pagesize == 0 ? parseInt(count / pagesize) : (parseInt(count / pagesize) + 1)) : 1;
  return pageInfo;
}

/**
 * 获取ip地址
 * @param req
 * @returns {*}
 */
exports.getClientIp = function(req) {
  var ipAddress;
  var forwardedIpsStr = req.header('x-forwarded-for');
  if (forwardedIpsStr) {
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
}

/**
 * 获取图片访问地址
 * @param type 图片类型，1:项目图片，2:用户头像，3:用户名片，4:活动图片，5:资讯图片，6:web图片，7:bp，8:临时文件，9:web上传
 * @param name
 * @param pid
 */
exports.getImgUrl = function(type, name, pid) {
  var doname = config.imgconfig.doname;
  if(name){
    var prefix = name.substr(0, 2);
    var storagepath = config.imgconfig.storage + prefix + '/' + name;
    var imgurl = doname + 'static/' + prefix + '/' + name;
    var exists = fs.existsSync(storagepath);
    if(exists) {
      return imgurl;
    }
  } else {
    return 'http://img.haoxiangmu.com/logo_default.png';
  }
  switch(type) {
    case 1:
      imgurl = doname + 'project_img/' + pid + '/images/' + name;
      break;
    case 2:
      imgurl = doname + 'user_avatar/' + name;
      break;
    case 3:
      imgurl = doname + 'verifycard/' + name;
      break;
    case 4:
      imgurl = doname + 'party_img/' + name;
      break;
    case 5:
      imgurl = doname + 'art_img/' + name;
      break;
    case 6:
      imgurl = doname + 'web_img/' + name;
      break;
    case 7:
      imgurl = doname + 'bp/' + name;
      break;
    case 8:
      imgurl = doname + 'temp_file/' + name;
      break;
    case 9:
      imgurl = doname + 'temp_web/' + name;
      break;
    default:
      imgurl = doname + 'default/' + name;
  }
  return imgurl;
};
