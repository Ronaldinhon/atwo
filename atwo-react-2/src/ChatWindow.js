import React, {Component} from 'react';
import {Launcher} from 'react-chat-window';
import { HEADERS } from './constants';
import { ActionCableConsumer } from 'react-actioncable-provider';
import axios from 'axios';
 
class ChatWindow extends Component {
 
  constructor() {
    super();
    this.state = {
      messageList: [],
      teamName: 'react-chat-window',
      isOpen: false,
      chatCreated: false,
      conversationId: null
    };
  }
 
  _onMessageWasSent(message) {
    // console.log(message.data);
    axios.post(`api/v1/messages`, {
      headers: HEADERS,
      message: {text: message.data.text, conversation_id: this.state.conversationId, emoji: message.data.emoji, from_react: true}
    });
    this.setState({
      messageList: [...this.state.messageList, message]
    });
  }

  _createChat() {
    this.setState({isOpen: !this.state.isOpen});
    if (!this.state.chatCreated) {
      this.setState({chatCreated: !this.state.chatCreated});
      axios.post(`api/v1/conversations`, {
        headers: HEADERS,
        conversation: {title: this.state.teamName}
      })
      .then(response => {
        this.setState({conversationId: response.data.conversation.id});
      });
    }
  }
 
  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }

  handleReceivedMessage = response => {
    // console.log(response);
    const { message } = response;
    // console.log(message);
    this._sendMessage(message.text);
  };
 
  render() {
    return (<div>
      
      <div>
        <ActionCableConsumer
          channel={{ channel: 'MessagesChannel', conversation: this.state.conversationId }}
          onReceived={this.handleReceivedMessage}
        />
      </div>

      <Launcher
        agentProfile={{
          teamName: this.state.teamName,
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
        handleClick={this._createChat.bind(this)}
        isOpen={this.state.isOpen}
      />

    </div>)
  }
}

export default ChatWindow;