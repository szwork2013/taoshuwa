import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import {AddFriendInput,FriendList,FriendListItem,About,Contact,Book,Login,Register,AddBook,CheckBook, BookLoanList } from '../components';
import { Home,Center,BookDetail,UserInfo,Borrow,MessageList} from '../containers';
import {redirectToBack,redirectToLogin,redirectToNow} from '../utils/authService.js'

export default ()=> (
  <Route path="/" component={Home}>
    <IndexRoute component={Book}/>
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path='/book/add/:id' component={AddBook} />
    <Route path='/book/check' component={CheckBook} />
    <Route path='/book/loan' component={BookLoanList} onEnter={redirectToLogin}/>
    <Route path="/login" component={Login} onEnter={redirectToBack}  />
    <Route path="/register" component={Register} onEnter={redirectToNow}/>
    <Route path="/center" component={Center} />
    <Route path="/userinfo" component={UserInfo} />
    <Route path="/book/:id" component={BookDetail} />
    <Route path="/book/borrow/:id" component={Borrow} />
    <Route path="/messagelist" component={MessageList} />
    <Redirect from="/*" to="/" />
  </Route>
)
