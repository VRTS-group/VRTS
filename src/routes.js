import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Component/Home";
import IndivPost from "./Component/IndivPost";
import Profile from "./Component/Profile";
import Settings from "./Component/Settings";
import MyPosts from "./Component/MyPosts";
import Upload from "./Component/Upload";
import Register from "./Component/Register";
import popUp from "./Component/HomePopUp";
import Saves from "./Component/Saves";
import MusicHome from "./Component/Home_Music";
import ProfileMusic from "./Component/Profile_Music";
import ProfileWrite from "./Component/Profile_Write";
import WriteHome from "./Component/Home_Write";
import Upload_Write from "./Component/Upload_Write";
import EditWrite from "./Component/EditWrite";
import WriteEdit from "./Component/WriteEdditor";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/indivpost/:id" component={IndivPost} />
    <Route path="/profile/:id" component={Profile} />
    <Route path="/settings" component={Settings} />
    <Route path="/myposts" component={MyPosts} />
    <Route path="/register" component={Register} />
    <Route path="/popUp/:id" component={popUp} />
    <Route path="/upload/:id" component={Upload} />
    <Route path="/homeM" component={MusicHome} />
    <Route path="/profileM/:id" component={ProfileMusic} />
    <Route path="/profileW/:id" component={ProfileWrite} />
    <Route path="/homeW" component={WriteHome} />
    <Route path="/uploadW" component={Upload_Write} />
    <Route path="/saves/:id" component={Saves} />
    <Route path="/EditWrite/:id" component={EditWrite} />
    <Route path="/WriteEdit/:id" component={WriteEdit} />
  </Switch>
);
