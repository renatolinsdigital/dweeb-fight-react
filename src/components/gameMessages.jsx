import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { messageUpdate } from "../store/actions";
import { NO_MESSAGE } from "../store/actionTypes";
import ReactHtmlParser from "react-html-parser";

class GameMessages extends Component {
  componentDidMount() {
    this.props.messageUpdate(NO_MESSAGE);
  }

  render() {
    return (
      <span style={this.getMessageStyle()}>
        {ReactHtmlParser(this.props.messageTextOrHtml)}
      </span>
    );
  }

  getMessageStyle() {
    return {
      textAlign: "center",
      fontSize: "calc( 14px + 1vw )"
    };
  }
}

GameMessages.prototypes = {
  messageTextOrHtml: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

const mapStateToProps = state => ({
  messageTextOrHtml: state.message.messageTextOrHtml
});

export default connect(mapStateToProps, { messageUpdate })(GameMessages);
