//检测手机号码
export function checkPhone(account) {
  if (account.length == 0) {
    return false;
  }
  var reg = /^(((1[0-9][0-9]{1})|159|153|170)+\d{8})$/;
  if (!reg.test(account)) {
    return false;
  }
  return true;
}

//检测密码 只能输入6-20位的数字，字母和下划线
export function checkPassword(account) {
  var patrn = /^(\w){6,20}$/;
  if (!patrn.exec(account))
    return false
  return true
}

//检测验证码
export function checkVCode(account) {
  var reg = /^\d{4}$/;
  if (!reg.test(account)) {
    return false;
  }
  return true;
}

//验测邀请码
export function checkICode(icode) {
  return true;
}

//检测邮件
export function checkEmail(account) {
  if (account.length == 0) {
    return false;
  }
  var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  if (!reg.test(account)) {
    return false;
  }
  return true;
}
//校验是否全由数字组成
export function isDigit(s) {
  var patrn = /^[0-9]{1,20}$/;
  if (!patrn.exec(s))
    return false
  return true
}
