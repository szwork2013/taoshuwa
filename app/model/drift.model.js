'use strict';

let mongoose = require('mongoose');
let Promise = require('bluebird');

//说明:
//(1)同一本书同时可能存在多个申请,当某一个申请被接受之后,同时存在的其他的申请将会被拒绝掉
//(2)driftSchema包括用户的申请纪录和某本书的借书纪录 或者 后面将借书历史记录独立出来
let driftSchema = new mongoose.Schema({

  driftid:{ //漂移单号,该信息唯一
    type:String,
    unique: true
  },

  bookid:{//书的编号,获取书的相关信息,包括书的拥有人
    type:mongoose.Schema.Type.ObjectId,
    ref:'Book'
  },

  loanid:{ //借出人的ID
    type:mongoose.Schema.Type.ObjectId,
    ref:'User'
  },

  borrowid:{ //借入人的ID
    type:mongoose.Schema.Type.ObjectId,
    ref:'User'
  },

  apply_time:{ //申请时间,默认为当前时间
    type:Date,
    default: Date.now
  },
  start_time:Date, //借书正式开始时间
  end_time:Date,//借书正式截至时间
  position:Array,//经纬坐标地址 程序搜索使用,用户不可见
  address:String,//借书详细地址 页面显示使用,用户可见
  phone:String,//默认使用注册号码,用户能够更改
  cycle:{ //表示第几次成功的借书,如果成功的历史纪录为3次,当前cycle的值为4,但是cycle为4的周期只有借书成功之后,才会进入下一周期
    type:Number,
    default:0
  },
  created:{ //当前申请纪录生成的时间
    type:Date,
    default: Date.now
  },

  updated:{ //当前申请纪录修改的时间
    type:Date,
    default:Date.now
  },
})

let drfitModel = mongoose.model('Drift', driftSchema)

Promise.promisifyAll(drfitModel);
Promise.promisifyAll(drfitModel.prototype);
module.exports = drfitModel;