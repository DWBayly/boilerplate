import React, {Component} from 'react';
class Message extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const messages = this.props.messages;
    console.log(this.props.messages);
    //create list where html elements will fit into
    let elements=[];
    //for each message, push an html element to elements. 
    messages.forEach(function each(message){
      switch(message.type){   
          case "incomingNotification":
            elements.push(
              <div className="message system" key = {message.id}>
                <b style={{color:message.oldcolor}}>  {message.oldname} </b>  {message.content}<b style={{color:message.color}}> {message.username}  </b>
              </div>
            );
            break;
          default:
          elements.push(
          <div key ={message.id}>
              <span><b style= {{color:message.color}}>{message.username}</b> :  {message.content}
              </span>
          </div>
          );
        }
    });
    return (
      <span>{elements}</span>
    );
  }
}
export default Message;
