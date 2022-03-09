import axios from 'axios';
import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    axios.get(`http://localhost:8080/feed/post/${postId}`,{
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.props.token}`
       }
    })
      .then(({ data }) => {
        console.log(data, 'THE LAST THING');
        this.setState({
          title: data.post.title,
          author: data.post.creator.userName,
          image: data.post.imageUrl,
          date: new Date(data.post.createdAt).toLocaleDateString('en-US'),
          content: data.post.content
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={`http://localhost:8080/${this.state.image}`} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePost;
