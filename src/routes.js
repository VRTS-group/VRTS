import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Component/Home";
import IndivPost from "./Component/IndivPost";
import Profile from "./Component/Profile";
import Settings from "./Component/Settings";
import MyPosts from "./Component/MyPosts";
import Upload from "./Component/Upload"
import Register from "./Component/Register";
import popUp from "./Component/HomePopUp";
import { updateExpression } from "@babel/types";
import EditPage from "./Component/EditPage";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/indivpost/:id" component={IndivPost} />
    <Route path="/profile/:id" component={Profile} />
    <Route path="/settings" component={Settings} />
    <Route path="/myposts" component={MyPosts} />
    <Route path="/register" component={Register} />
    <Route path="/popUp/:id" component={popUp} />
    <Route path="/upload/:id" component={Upload}/>
    <Route path="/editpage/:id" component={EditPage}/>
  </Switch>
);
