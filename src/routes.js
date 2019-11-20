import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Component/Home'
import IndivPost from './Component/IndivPost';
import Profile from './Component/Profile';
import Settings from './Component/Settings';
import MyPosts from './Component/MyPosts';
import Auth from './Component/Auth';

export default (
    <Switch>
        <Route exact path = './' component={Home}/>
        <Route path = '/auth' component={Auth}/>
        <Route path = '/indivpost' component={IndivPost}/>
        <Route path = '/profile' component={Profile}/>
        <Route path = '/settings' component={Settings}/>
        <Route path = '/myposts' component={MyPosts}/>
    </Switch>
)