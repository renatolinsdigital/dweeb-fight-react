import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { messageUpdate } from "../store/actions";
import { NO_MESSAGE } from "../store/actionTypes";

class GameMessages extends Component {
  componentDidMount() {
    this.props.messageUpdate(NO_MESSAGE);
  }

  render() {
    return <div className="message">{<span>{this.props.messageText}</span>}</div>;
  }
}

GameMessages.prototypes = {
  message: PropTypes.string
};

const mapStateToProps = state => ({
  messageText: state.message.text
});

export default connect(mapStateToProps, { messageUpdate })(GameMessages);
