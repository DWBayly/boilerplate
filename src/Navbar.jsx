import React, {Component} from 'react';
class Navbar extends Component {
  constructor(props){
    super(props);
  }
  //render nav bar
  render(){
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a> <span>Users Online: {this.props.state.numUsers}</span>
      </nav>
    );
  }
}
export default Navbar;
