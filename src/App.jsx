import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
//const uuidv1 = require('uuid/v1');
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
//source for random color generator https://stackoverflow.com/questions/1484506/random-color-generator

class App extends Component {
  constructor(props){
    super(props);
    this.exampleSocket = new WebSocket("ws://localhost:3001/");
    this.state = {
      currentUser: {name: "Bob",color: getRandomColor()}, 
      messages: [],
      numUsers:0
      
    }
   
  }
  componentDidMount() {
    //console.log("componentDidMount <App />");
  }
  updateCounter = (message)=>{
    this.setState({numUsers:message.val})
  }
  sendMessage = (message)=>{  
      //console.log(message);
        this.exampleSocket.send(JSON.stringify(message)); 
  }
  postText= (message)=>{
    
    let updatedMessage = this.state.messages.concat(message);
    console.log(updatedMessage);
    this.setState({messages: updatedMessage})
  }
  addText= (message,name)=>{
      const newMessage = {username: name,color:this.state.currentUser.color, content: message, type:"postMessage"};;
      //const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      //console.log("SENDING MESSAGE");
      this.sendMessage(newMessage);
      //this.setState({messages: messages})
  }
  changeUser= (prevName,curName)=>{
    const cont = " has changed their username to ";
    const newcolor=getRandomColor();
    const newMessage = {username: curName, oldcolor:this.state.currentUser.color,color:newcolor,oldname:prevName, content: cont, type:"postNotification"};
    this.sendMessage(newMessage);
    this.setState({currentUser:{name:curName,color:newcolor}});

  }
  render() {
    //console.log(this.state);
    //console.log("IN APP");
   let x = this.postText;
   let y = this.updateCounter
   this.exampleSocket.onmessage = function (event) {
       
       const message = JSON.parse(event.data);
       if(message.type==="updateCounter"){
          y(message)
       }else{
          x(message);
       }
       //const updatedMessages = this.state.messages.concat(newMessage);
       //this.setState({messages: updatedMessages}); 
    }
    return (
    <div>
     <Navbar state = {this.state}/>
	  <main> 
	   <MessageList state = {this.state}/>
	   <ChatBar state = {this.state} changeUser = {this.changeUser} result = {this.addText}/>
	   </main>
      </div>
    );
  }
}
export default App;
