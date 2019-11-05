import React, { Component } from 'react';

var websocket = new WebSocket("ws://192.168.2.64");

function wsConnect(url) {
  // Connect to WebSocket server
  // Assign callbacks
  websocket.onopen = function (evt) { onOpen(evt) };
  websocket.onclose = function (evt) { onClose(evt) };
  websocket.onmessage = function (evt) { onMessage(evt) };
  websocket.onerror = function (evt) { onError(evt) };
}

// Called when a WebSocket connection is established with the server
function onOpen(evt) {
  // Log connection state
  console.log("Connected bos");
}

// Called when the WebSocket connection is closed
function onClose(evt) {
  console.log("Disconnected");
  // Try to reconnect after a few seconds
  setTimeout(function () { wsConnect("ws://192.168.2.64") }, 2000);
}

// Called when a message is received from the server
function onMessage(evt) {
  // Print out our received message
  console.log("Received: " + evt.data);
  // Update circle graphic with LED state
  switch (evt.data) {
    case "#":
      console.log("Received: " + evt.data);
      break;
    case "relay 1":
      console.log("LED 1 is off");
      break;
    case "1":
      console.log("LED 1 is on");
      break;
    case "relay 2":
      console.log("LED 2 is on");
      break;
    case "relay 3":
      console.log("LED 3 is on");
      break;
    default:
      break;
  }
}

// Called when a WebSocket error occurs
function onError(evt) {
  console.log("ERROR: " + evt.data);
}

// Sends a message to the server (and prints it to the console)
function doSend(message) {
  websocket.send(message);
}
function onPress() {
  if (websocket.readyState === WebSocket.CONNECTING) {
    setInterval(() => {
      doSend("0");
    }, 1000)
  }
}

// Called whenever the HTML button is pressed

class App extends Component {
  componentWillMount() {
    wsConnect("ws://192.168.2.64");
    onPress();

  }

  click_relay1() {
    doSend("1");
  }
  click_relay2() {
    doSend("2");
  }
  click_relay3() {
    doSend("3");
  }
  click_relay4() {
    doSend("4");
  }
  click_relay5() {
    doSend("5");
  }
  click_relay6() {
    doSend("6");
  }
  click_relay7() {
    doSend("7");
  }

  render() {
    return (
      <div>
        MONITORING DATA
        <button onClick={this.click_relay1}>relay 1</button>
        <button onClick={this.click_relay2}>relay 2</button>
        <button onClick={this.click_relay3}>relay 3</button>
        <button onClick={this.click_relay4}>relay 4</button>
        <button onClick={this.click_relay5}>relay 5</button>
        <button onClick={this.click_relay6}>relay 6</button>
        <button onClick={this.click_relay7}>relay 7</button>
      </div>)



  }
}

export default App;