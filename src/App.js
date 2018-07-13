import React, { Component } from 'react';
import socket from './socket/socketAPI';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Offline',
      input: '',
      incoming: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }
  componentDidMount() {
    socket.on('status', (data) => {
      this.statusUpdate(data);
      // socket.emit('my other event', { my: 'data' });
    })
    socket.on('incomingMessage', (data) => {
      // console.log('<<< Client: incomingMessage: ', data)
      this.setState({ incoming: data })
    })
  }

  componentWillUpdate() {
  }

  componentWillUnmount() {
    socket.disconnect()
  }

  statusUpdate = data => {
    this.setState({ status: data.status })
    console.log('<<< Client: statusUpdate data ', data)
  }

  handleChange(e) {
    // console.log('handleChange: ', e.target.value)
    this.setState({
      input: e.target.value,
    })
  }

  handleSend(e) {
    e.preventDefault();
    console.log('handleSend: ', this.state.input);
    socket.emit('clientMessage', this.state.input);
  }

  render() {
    // console.log('this.state.input: ', this.state.input)
    // console.log("<<< Client: render() this.state.status ", this.state.status)
    return (
      <div className="App">
        <h1>WELCOME TO THE SOCKET DOME</h1>
        <h2>Socket Server Status: {this.state.status}</h2>
        <form>
          <label>Server Comm:</label><br />
          <input onChange={this.handleChange} name="message" type="text" placeholder="Message" autoFocus autoComplete="off" />
        </form>
        <button onClick={this.handleSend}>Send</button>
        <h3>Incoming Message:</h3>
        <p>
          {this.state.incoming}
        </p>
      </div>
    );
  }
}

export default App;
