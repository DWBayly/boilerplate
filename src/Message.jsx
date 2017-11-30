import React, {Component} from 'react';
class Message extends Component {
  constructor(props){
    super(props);

  }
  render() {
    const messages = this.props.messages;
    console.log(messages);
    const listItems = messages.map((message) =>
      <div>
      <span key ={message.id}><b>{message.username}</b> :  {message.content}
      </span>
      </div>
    );
    //console.log(listItems.toString());
    return (
      <span>{listItems}</span>
    );
  }
}
export default Message;
