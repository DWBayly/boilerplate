import React, {Component} from 'react';
import Message from './Message.jsx';
class MessageList extends Component {
  constructor(props){
    super(props);
  }
  render() {
  //render message list
    return (
      <main className="messages">
        <Message messages={this.props.state.messages}/>
      </main>

    );
  }
}
export default MessageList;
