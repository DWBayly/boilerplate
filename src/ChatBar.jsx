import React, {Component} from 'react';
class ChatBar extends Component {
  constructor(props){
    super(props);
    
  }
  //handles any event when a key is pressed in the users chatbot. Only acts on enter press
 _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.result(e.target.value,this.props.state.currentUser.name);
      //this.result(e.target.value);
    }
  }
  //handles any event when a key is pressed in the users name box. Only acts on enter press.
  changeUser = (e) => {
    if(e.key ==='Enter'){
      this.props.changeUser(this.props.state.currentUser.name,e.target.value);
    }


  }
  //Renders the chat box
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.state.currentUser.name} onKeyPress={this.changeUser}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._handleKeyPress}/>
      </footer>
    );
  }
}
export default ChatBar;
