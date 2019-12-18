import React, { Component } from 'react';
//import axios from 'axios';
//The next axios is an instance we created with some specific config. (Could have been named anything else)
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    
    state =  {
        posts:[],
        selectedPostId:null,
        error:false
    }
    
    componentDidMount() {
        //AXIOS.GET creates an async request (Promise) and it is eventually executed and completed
        //with .then we execute the function we pass in there with the response as parameter.
        let posts = axios.get("/posts").then(
            (response) => {
                console.log(response.data);
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map ( post => {
                        return {
                            ...post,
                            author: 'Luismi'
                        }
                    });
        console.log(updatedPosts)
                this.setState({posts:updatedPosts});
            this.setState({error:false})
    
    }
        ).catch( error => {
            this.setState({error:true})
        });
    }
    
    postSelectedHandler = (id) => {
        this.setState({selectedPostId:id})
    }
    
    render () {
        let posts = <p style={{textAlign:'center'}}>Something went wrong!</p>
        if(!this.state.error){
            posts = this.state.posts.map( post => {
                    return <Post key={post.id}
                                 title={post.title}
                                 author={post.author}
                                 click={ () => this.postSelectedHandler(post.id)}/>
                }
             );
        }
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;