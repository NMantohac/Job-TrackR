import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Segment, Image, Grid } from 'semantic-ui-react';
import moment from 'moment';
import bot from '../../images/bot.png';
import defaultavatar from '../../images/defaultavatar.png';
import './style.css';

class ChatRoomMessageBox extends Component {
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const chatTextArea = document.getElementById('message-container');
    const { scrollHeight } = chatTextArea;
    const height = chatTextArea.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(chatTextArea).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    return (
      <div>
        <Segment inverted style={{ marginTop: '-40px' }}>
          <div id="message-container">
            <Segment>
              <Grid verticalAlign="middle">
                <Grid.Row>
                  <Image src={bot} height="50" width="50" style={{ marginLeft: '5px', marginRight: '5px' }} />
                  <p>
                    <strong style={{ fontSize: '20px' }}>Chat Bot</strong>
                    <span style={{ fontSize: '12px', marginLeft: '3px' }}>5/27/2020 | 10:00pm</span>
                    <br />
                    <span style={{ fontSize: '16px' }}>Welcome to the Chat Room!</span>
                  </p>
                </Grid.Row>
              </Grid>
            </Segment>
            { this.props.messages.map((message, index) => (
              <Segment key={index}>
                <Grid verticalAlign="middle">
                  <Grid.Row>
                    <Image src={defaultavatar} height="50" width="50" style={{ marginLeft: '5px', marginRight: '5px' }} />
                    <p>
                      <strong style={{ fontSize: '20px' }}>{message.username}</strong>
                      <span style={{ fontSize: '12px', marginLeft: '3px' }}>{moment(message.date).format('l | dddd | h:m A')}</span>
                      <br />
                      <span style={{ fontSize: '16px' }}>{message.text}</span>
                    </p>
                  </Grid.Row>
                </Grid>
              </Segment>
            ))}
          </div>
        </Segment>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.chat.messages,
  };
}

export default connect(mapStateToProps, {})(ChatRoomMessageBox);
