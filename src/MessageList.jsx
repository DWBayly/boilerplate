import React, {Component} from 'react';
import Message from './Message.jsx';
class MessageList extends Component {
  constructor(props){
    super(props);

  }
  render() {
    console.log(this.props.state.currentUser.name);
    return (
      <main className="messages">
        <Message messages={this.props.state.messages}/>
      </main>

    );
  }
}
export default MessageList;
