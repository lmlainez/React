import React, { Component } from 'react';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

//Switch makes the router to return just the first fitting route instead of all of the
//matching ones.
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

import Posts from '../../containers/Posts/Posts';
import NewPost from '../../containers/NewPost/NewPost';

//Code to load JS of components Asynchronously
/*
const AsyncNewPost = asyncComponent(() => {
        return import('../../containers/NewPost/NewPost');
    });
   */
import './Blog.css';

class Blog extends Component {
  
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                exact to="/"
                                activeStyle={{textDecoration:'underline'}}>Home</NavLink></li>
                            <li><NavLink to="/new-post">New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
               
                <Switch>
                    <Redirect from="/posts" to="/"/>
                    <Route path="/new-post" exact component={NewPost}></Route>
                    <Route path="/"  exact component={Posts}></Route>
                    <Route render={ () => <h1>Not found</h1>} ></Route>
                </Switch>
            </div>
        );
    }
}

export default Blog;