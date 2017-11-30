import React, {Component} from 'react';
class Message extends Component {
  constructor(props){
    super(props);

  }
  render() {
    const messages = this.props.messages;
    console.log(this.props.messages);
    let elements=[];
    messages.forEach(function each(message){

      switch(message.type){
      
          case "incomingNotification":
            elements.push(
              <div className="message system" key = {message.id}>
                <b style={{color:'blue'}}>  {message.oldname} </b>  {message.content}<b style={{color:'red'}}> {message.username}  </b>
              </div>
            );
            break;
          default:
          elements.push(
          <div key ={message.id}>
              <span><b style= {{color:'red'}}>{message.username}</b> :  {message.content}
              </span>
          </div>
          );
        }
    });
    const listItems = messages.map((message) =>
      <div key ={message.id}>
      <span><b>{message.username}</b> :  {message.content}
      </span>
      </div>
    );
    //console.log(listItems.toString());
    return (
      <span>{elements}</span>
    );
  }
}
export default Message;
