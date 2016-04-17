import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import {AddFriendInput,FriendList,FriendListItem,About,Contact,Book,Login,Register,AddBook,CheckBook,BookLoanList} from '../components';
import { Home,Center,BookDetail } from '../containers';
import {redirectToBack,redirectToLogin,redirectToNow} from '../utils/authService.js'

export default ()=> (
  <Route path="/" component={Home}>
    <IndexRoute component={Book}/>
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path='/book/add/:id' component={AddBook} onEnter={redirectToLogin}/>
    <Route path='/book/check' component={CheckBook} onEnter={redirectToLogin}/>
    <Route path='/book/loan' component={BookLoanList} onEnter={redirectToLogin}/>
    <Route path="/login" component={Login} onEnter={redirectToBack}  />
    <Route path="/register" component={Register} onEnter={redirectToNow}/>
    <Route path="/center" component={Center} />
    <Route path="/book/:id" component={BookDetail} />
    <Redirect from="/*" to="/" />
  </Route>
)
