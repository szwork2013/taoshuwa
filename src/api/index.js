import {UserResource,AuthResource,ArticleResource,TagResource,MobileResource,CommentResource,BookResource, CategoryResource,DriftResource,WechatResource} from './resources'

export default {

  //add by pengjian for taoshuwa

  //book
  addNewBook:function(data){
    return BookResource('post', 'add_book', data)
  },
  fetchBookList:function(data){
    return BookResource('get','',data)
  },
  fetchLoanBookList:function(data){
    return BookResource('get','loan',data)
  },
  fetchOneBook:function(data){
    return BookResource('get','fetchone',data)
  },


  //user
  register: function(data){
    return UserResource('post','register',data)
  },
  getVCode: function(data){
    return UserResource('get','vcode',data)
  },
  localLogin: function (data) {
    return AuthResource('post', 'local', data)
  },
  mdUser: function (data) {
    return UserResource('put', 'update', data)
  },
  setUserPosi:function(data){
    return UserResource('post','setposi',data)
  },

  addUserAddress:function(data){
    return UserResource('post','add_address',data)
  },

  delUserAddress:function(data){
    return UserResource('get','delete_address',data)
  },

  fetchAddressList:function(data){
    return UserResource('get','addresslist',data)
  },

  setDefaultAddress:function(data){
    return UserResource('get','set_default_address',data)
  },

  //图书类别
  fetchCategoryWithUser:function(data){
    return CategoryResource('get','listwithuser', data)
  },

  //处理借书请求
  dealRequest: function(data){
    return DriftResource('get','deal',data)
  },
  //发送借书请求
  createRequest: function(data){
    return DriftResource('post','create',data)
  },

  messageList: function(data){
    return DriftResource('get','message',data)
  },

  borrowList: function(data){
    return DriftResource('get','borrowlist',data)
  },

  desireList: function(data){
    return DriftResource('get','desirelist',data)
  },
  
  finishReading:function(data){
    return DriftResource('post','finish_reading',data)
  },

  addDesire:function(data){
    return DriftResource('get','adddesire',data)
  },

  checkBookStatus:function(data){
    return DriftResource('get','check_drift_status',data)
  },

  setScanQR:function(data){
    return WechatResource('get','scanQRCode',data)
  },

  //comment
  getCommentList:function (data) {
    return CommentResource('get','comment_list',null,data)
  },
  addNewComment:function (data) {
    return CommentResource('post', 'add_comment', null, data)
  },

  //old
  getSnsLogins: function () {
    return UserResource('get', 'snsLogins')
  },
  getMe: function (data) {
    return UserResource('get', 'me', data)
  },

  getTagList:function () {
    return TagResource('get','getFrontTagList')
  },
  getApps:function () {
    return MobileResource('get','getApps')
  },
  //article
  getIndexImage:function () {
    return ArticleResource('get', 'getIndexImage')
  },
  getArticleList:function (options) {
    return ArticleResource('get', 'getFrontArticleList', null, {params:options})
  },
  getArticleDetaile:function (id) {
    return ArticleResource('get', id, 'getFrontArticle')
  },
  toggleLike:function (id) {
    return ArticleResource('put',id,'toggleLike')
  },
  getPrenext:function (id,options) {
    return ArticleResource('get',id,'getPrenext', {params:options})
  },

  addNewReply: function (id,data) {
    return CommentResource('post', id, 'addNewReply', data)
  },
  delComment:function (id) {
    return CommentResource('delete', id)
  },
  delReply: function (id,data) {
    return CommentResource('delete', id, 'delReply', data)
  }
}
