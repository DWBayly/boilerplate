import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
//const uuidv1 = require('uuid/v1');


class App extends Component {
  constructor(props){
    super(props);
    this.exampleSocket = new WebSocket("ws://localhost:3001/");
    this.state = {
      currentUser: {name: "Bob"}, 
      messages: []
    }
   
  }
  componentDidMount() {
    //console.log("componentDidMount <App />");
  
  
  }
  sendmessage = (message)=>{  
      //console.log(message);
        this.exampleSocket.send(JSON.stringify(message)); 
  }
  postText= (message)=>{
    
    let updatedMessage = this.state.messages.concat(JSON.parse(message));
    console.log(updatedMessage);
    this.setState({messages: updatedMessage})
  }
  addText= (message,name)=>{
      const newMessage = {username: name, content: message};
      //const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      //console.log("SENDING MESSAGE");
      this.sendmessage(newMessage);
      //this.setState({messages: messages})
  }
  changeUser= (name)=>{
    this.setState({currentUser:{name:name}});

  }
  render() {
    //console.log(this.state);
    //console.log("IN APP");
   let x = this.postText;
   this.exampleSocket.onmessage = function (event) {
       
       const message = event.data;
       x(message);
       //const updatedMessages = this.state.messages.concat(newMessage);
       //this.setState({messages: updatedMessages}); 
    }
    return (
	  <main> 
	   <MessageList state = {this.state}/>
	   <ChatBar state = {this.state} changeUser = {this.changeUser} result = {this.addText}/>
	  </main>
    );
  }
}
export default App;
