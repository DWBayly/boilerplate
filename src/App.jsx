import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
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
  //create 
  constructor(props){
    super(props);
    this.exampleSocket = new WebSocket("ws://localhost:3001/");
    this.state = {
      currentUser: {name: "Bob",color: getRandomColor()}, 
      messages: [],
      numUsers:0
      
    }
  }
  //Update online users value
  updateCounter = (message)=>{
    this.setState({numUsers:message.val})
  }
  //generic function to send a message to server
  sendMessage = (message)=>{  
      //console.log(message);
        this.exampleSocket.send(JSON.stringify(message)); 
  }
  //updates message list and signals new render
  postText= (message)=>{    
    let updatedMessage = this.state.messages.concat(message);
    this.setState({messages: updatedMessage})
  }
  //constructs a new message and sends it to the server
  addText= (message,name)=>{
      const newMessage = {username: name,color:this.state.currentUser.color, content: message, type:"postMessage"};;
      this.sendMessage(newMessage);
  }
  //changes the current user, and sends a new message to all server to notify call other clients of the change
  //Stretch: change color on user name change
  changeUser= (prevName,curName)=>{
    const cont = " has changed their username to ";
    const newcolor=getRandomColor();
    const newMessage = {username: curName, oldcolor:this.state.currentUser.color,color:newcolor,oldname:prevName, content: cont, type:"postNotification"};
    this.sendMessage(newMessage);
    this.setState({currentUser:{name:curName,color:newcolor}});
  }
  render() {
    //x and y are just here to allow onmessage to have access to those functions. 
   let x = this.postText;
   let y = this.updateCounter
   //set up response to recieving a message from the server
   this.exampleSocket.onmessage = function (event) {   
       const message = JSON.parse(event.data);
       if(message.type==="updateCounter"){
          y(message)
       }else{
          x(message);
       }
    }
    //return 
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
