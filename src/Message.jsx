import React, {Component,View,Image} from 'react';

const uuidv1 = require('uuid/v1');
class Message extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const messages = this.props.messages;
    //create list where html elements will fit into
    let elements=[];
    //for each message, push an html element to elements. 
    const re = /\bimg:\S*\b/g;
    let extract=(message)=>{
      let links = message.match(re);

      let words = message.split(re);
      let finalMessage = [];
      if(links===null){
        return <span key = {uuidv1()} >{message}</span>;
      }
      for(let i = 0; i < links.length;i++){
          let url =links[i].slice(4);
          finalMessage.push(<span key = {uuidv1()}>{words[i]} <img src = {url.toString()} style = {{width:'100px',height:'100px'}}></img></span>);
      }
      finalMessage.push(words[words.length-1]);
      return finalMessage;
    }
    messages.forEach(function each(message){
      switch(message.type){   
          case "incomingNotification":
            elements.push(
              <div className="message system" key = {message.id}>
                <b style={{color:message.oldcolor}}>  {message.oldname} </b>  {message.content}<b style={{color:message.color}}> {message.username}  </b>
              </div>
            );
            break;
          case "updateCounter":
            elements.push(
              <div className="message system" key = {message.id}>{message.content}</div>
            );
          break;
          default:
          let finalMessage =extract(message.content); 
          elements.push(
          <div key ={message.id}>
             <b style = {{color:message.color}}>{message.username}: </b>{finalMessage}
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
