import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import {AddFriendInput,FriendList,FriendListItem,About,Contact,Book,Login,Register,AddBook,CheckBook, BookLoanList,BorrowRule } from '../components';
import { Home,Center,BookDetail,UserInfo,Borrow,MessageList, EarnPoint,BorrowList,DesireList} from '../containers';
import {redirectToBack,redirectToLogin,redirectToNow} from '../utils/authService.js'

export default ()=> (
  <Route path="/" component={Home}>
    <IndexRoute component={Book}/>
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path='/book/add/:id' component={AddBook} />//添加书的界面
    <Route path='/book/check' component={CheckBook} /> //调用第三方接口查询书的数据
    <Route path="/login" component={Login} onEnter={redirectToBack}  />
    <Route path="/register" component={Register} onEnter={redirectToNow}/>
    <Route path="/center" component={Center} />//用户中心
    <Route path="/userinfo" component={UserInfo} onEnter={redirectToLogin}/>//用户个人信息
    <Route path="/book/:id" component={BookDetail} />//图书详情
    <Route path="/book/borrow/:id" component={Borrow} onEnter={redirectToLogin}/>//借书界面
    <Route path='/loanlist' component={BookLoanList} onEnter={redirectToLogin}/> //捐赠书列表
    <Route path="/messagelist" component={MessageList} onEnter={redirectToLogin}/> //消息列表
    <Route path="/borrowlist" component={BorrowList} onEnter={redirectToLogin}/> //借书列表
    <Route path="/desirelist" component={DesireList} onEnter={redirectToLogin}/> //心愿单列表
    <Route path="/borrowrules" component={BorrowRule} /> //借书规则
    <Route path="/earnpoints" component={EarnPoint} /> //赚积分
    <Redirect from="/*" to="/" />
  </Route>
)
