import React, { Component } from "react";
import logoImage from "../imgs/logos/logo_mini.png";
import { TOGGLE_ABOUT_MODAL_VISIBILITY } from "../store/actionTypes";
import { gameStateUpdate } from "../store/actions";
import { connect } from "react-redux";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <header className="home-header">
          <a href="./" title="Dweeb Fight" className="logo">
            <img src={logoImage} alt="Dweeb Fight Logo" />
          </a>
          <span className="version">v 1.1</span>
          <button
            className="about-button"
            onClick={() =>
              this.props.gameStateUpdate(TOGGLE_ABOUT_MODAL_VISIBILITY)
            }
          >
            About
          </button>
        </header>
      </React.Fragment>
    );
  }
}

export default connect(() => ({}), { gameStateUpdate })(Footer);
