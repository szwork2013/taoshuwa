'use strict';

var wechat = require('wechat');
var config = require('../../lib/config');

exports.wechat = wechat(config.wechatConfig, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  /** req.weixin详细的信息字段
   * ToUserName: 'gh_27f2f45fccc7',
   FromUserName: 'oF-HOvxmj0NnkPKNLkjmZQJI3oC0',
   CreateTime: '1458283842',
   MsgType: 'event',
   Event: 'CLICK',
   EventKey: 'V1001_TODAY_MUSIC'
   */
  var message = req.weixin;
  console.log('FromUserName-----:',message);

  //微信按钮点击事件处理
  if(message.Event === 'CLICK'){
    var eventKey = message.EventKey;
    if(eventKey === 'V1001_TODAY_MUSIC'){
      console.log('U are ok');
    }
  }

  if (message.FromUserName === 'oF-HOvxmj0NnkPKNLkjmZQJI3oC0') {
    // 回复屌丝(普通回复)
    res.reply('hehe');
  } else if (message.FromUserName === 'text') {
    //你也可以这样回复text类型的信息
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white_fe6da1ec.png',
        url: 'http://www.baidu.com/'
      }
    ]);
  }
})