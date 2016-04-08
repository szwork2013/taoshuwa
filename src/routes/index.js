import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import {AddFriendInput,FriendList,FriendListItem,About,Contact,Book,Login,Register,AddBook } from '../components';
import { Home,FriendListApp } from '../containers';


export default ()=> (
  <Route path="/" component={Home}>
    <IndexRoute component={About}/>
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/todo" component={FriendListApp} />
    <Route path="/book" component={Book} />
    <Route path='/book/add' component={AddBook} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Redirect from="/*" to="/" />
  </Route>
)
