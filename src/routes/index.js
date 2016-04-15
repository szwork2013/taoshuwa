import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import {AddFriendInput,FriendList,FriendListItem,About,Contact,Book,Login,Register,AddBook,CheckBook,BookLoanList} from '../components';
import { Home,FriendListApp,Center,BookDetail } from '../containers';
import {redirectToBack} from '../utils/authService.js'

//onEnter={redirectToLogin}
export default ()=> (
  <Route path="/" component={Home}>
    <IndexRoute component={About}/>
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/todo" component={FriendListApp} />
    <Route path="/book" component={Book} />
    <Route path='/book/add/:id' component={AddBook} />
    <Route path='/book/check' component={CheckBook} />
    <Route path='/book/loan' component={BookLoanList} />
    <Route path="/login" component={Login} onEnter={redirectToBack}  />
    <Route path="/register" component={Register} />
    <Route path="/center" component={Center} />
    <Route path="/book/:id" component={BookDetail} />
    <Redirect from="/*" to="/" />
  </Route>
)
