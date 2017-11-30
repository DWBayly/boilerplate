import React, {Component} from 'react';
class ChatBar extends Component {
  constructor(props){
    super(props);
    
  }
 _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.result(e.target.value,this.props.state.currentUser.name);
      //this.result(e.target.value);
    }
  }
  changeUser = (e) => {
    if(e.key ==='Enter'){

      this.props.changeUser(e.target.value);
    }


  }
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
