import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      json:[],
      last:5,
      bool:false,
      avatar:[]
    };
  }

  componentDidMount() {
    const data = localStorage.getItem("API");
    if (data === null) {
      fetch('https://api.github.com/users')
      .then(function(response) {
        return response.json();
       })
      .then(function(myJson) {
        localStorage.setItem("API",JSON.stringify(myJson));

         this.setState({
          json:myJson
        });
      });
    } else {
        this.setState({
          json:JSON.parse(data)
        });
    }
  }

  displayAvatarLogic = (last) => {
    const newArray = this.state.json;
     const splice = newArray.slice(0,last);
     
     return this.displayAvatar(splice);
  }

  displayFull = (login) => {

    if (this.state.avatar.login === login) {
    return (
      <div>
        <div>{this.state.avatar.url}</div>
        <div>{this.state.avatar.html_url}</div>
        <div>{this.state.avatar.followers_url}</div>
        <div>{this.state.avatar.gists_url}</div>
        <div>{this.state.avatar.starred_url}</div>
        <div>{this.state.avatar.subscriptions_url}</div>
      </div>
    );
    }
  }
  displayAvatar = (splice) => {
    
    return splice.map((avatar, key) => {
      return (
        <div style={{marginTop:"20px"}} key={key}>
          <div>{avatar.login}</div>
          <div>{avatar.avatar_url}</div>
           {this.state.bool ?this.displayFull(avatar.login) : null }
          <button type="button" style={{marginTop:"5px"}} onClick={() =>  this.setState({
      bool: true,
      avatar:avatar
    })}>View</button>
        </div>
      );  
    });
  }

  updateLast = () => {
    this.setState({
      last: this.state.last + 5
    });
  }

  render() {
    
    const last = this.state.last;

    if(this.state.json.length < 1) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {this.displayAvatarLogic(last)}
       
        <button type="button" style={{marginTop:"20px"}} onClick={() => this.updateLast(last)}>More</button>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
