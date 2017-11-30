// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;
// Create a new express server
const server = express()
// Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
let numUsers = 0;
// Create the WebSockets server
const wss = new SocketServer({ server });
//broadcast method
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(data));
  });
};
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  //increment numUsers when new client is connected  
  numUsers++;
  //Broacast message to all clients to broacast
  wss.broadcast({type:"updateCounter",val:numUsers});
  ws.on('message', function(message) {
    let data = JSON.parse(message);   
    switch(data.type){
      case "postMessage":
        data.type = "incomingMessage";
        break;
      case "postNotification":
        data.type="incomingNotification";
        data.content = " has changed their name to "
        break;    
      case "addUser":
        data.type="incomingNotification";
        data.content= " has entered the chat"
      default:
    }
    //set unique id
    data.id = uuidv1();  
    //broadcast data
    wss.broadcast(data);    
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    //decrease numUsers and broacast to clients the updated value
    numUsers--;
    wss.broadcast({type:"updateCounter",val:numUsers});
  });
});
