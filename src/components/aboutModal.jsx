import React, { Component } from "react";
import logo from "../imgs/logos/logo_transparent.png";
import { TOGGLE_ABOUT_MODAL_VISIBILITY } from "../store/actionTypes";
import { gameStateUpdate } from "../store/actions";
import { connect } from "react-redux";

class AboutModal extends Component {
  render() {
    const closeModalAction = () =>
      this.props.gameStateUpdate(TOGGLE_ABOUT_MODAL_VISIBILITY);
    return (
      <div
        style={getModalStyle(this)}
        tabIndex="-1"
        role="dialog"
        onClick={closeModalAction}
      >
        <div
          style={getDialogStyle()}
          role="document"
          onClick={e => preventModalClose(e)}
        >
          <div style={getHeaderStyle()}>
            <h1>About Dweeb Fight</h1>
            <button
              style={getCloseButtonStyle()}
              onClick={closeModalAction}
              aria-label="Close"
            >
              X
            </button>
          </div>
          <div style={getModalBodyStyle()}>
            <p style={{ fontSize: "42px", marginBottom: "10px" }}>
              DWEEB FIGHT by
            </p>
            <img src={logo} alt="Renato Lins Logo" style={getLogoStyle()} />
            <p>What it is: A fighting mini-game with open configuration</p>
            <p>How to play: Just click FIGHT and see dweebs fighting!</p>
            <p>Developed with React + Redux by Renato Lins</p>
          </div>
        </div>
      </div>
    );
  }
}

function preventModalClose(e) {
  e.stopPropagation();
}

// Style

function getModalStyle(classContext) {
  return {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    width: "100%",
    height: "100%",
    zIndex: 999,
    cursor: "pointer",
    display: classContext.props.isAboutModalVisible ? "flex" : "none",
    flexDirection: "column",
    overflowY: "auto",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px"
  };
}

function getDialogStyle() {
  return {
    backgroundColor: "#1D1F21",
    cursor: "default",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    maxWidth: "720px",
    minHeight: "150px",
    margin: "5px",
    borderRadius: "8px",
    overflow: "hidden"
  };
}

function getHeaderStyle() {
  return {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "15px 15px 10px 15px",
    backgroundColor: "#b70000",
    color: "white",
    fontSize: "22px"
  };
}

function getCloseButtonStyle() {
  return {
    backgroundColor: "transparent",
    color: "white",
    fontSize: "24px",
    margin: "0 5px 0 auto",
    padding: "3px 10px",
    outline: "none",
    userSelect: "none"
  };
}

function getModalBodyStyle() {
  return {
    padding: "40px",
    fontSize: "22px",
    textAlign: "center",
    overflowY: "auto",
    color: "white"
  };
}

function getLogoStyle() {
  return {
    height: "auto",
    maxHeight: "400px",
    width: "auto",
    maxWidth: "100%"
  };
}

const mapStateToProps = state => ({
  isAboutModalVisible: state.gameState.isAboutModalVisible
});

export default connect(mapStateToProps, { gameStateUpdate })(AboutModal);
