import React, { Component } from "react";
import AppTypes from "../types/index";

class DweebLife extends Component {
  getLifeBarStyle = (life, totalLife) => {
    let lifePercentage = (life / totalLife) * 100;
    if (lifePercentage.isNaN) lifePercentage = 0;
    let lifeColor = "gray";

    switch (true) {
      case lifePercentage <= 10: {
        lifeColor = "#d42300";
        break;
      }
      case lifePercentage <= 20: {
        lifeColor = "#e76802";
        break;
      }
      case lifePercentage <= 30: {
        lifeColor = "#e4ff00";
        break;
      }
      case lifePercentage <= 50: {
        lifeColor = "#5ba603";
        break;
      }
      case lifePercentage <= 100: {
        lifeColor = "#008000";
        break;
      }
      default: {
        lifeColor = "gray";
      }
    }

    return {
      display: "flex",
      backgroundColor: lifeColor,
      height: "100%",
      padding: "25px 0",
      width: lifePercentage.toString() + "%",
      maxWidth: "100%"
    };
  };

  lifeLabelStyle = {
    position: "absolute",
    top: "5px",
    color: "white",
    fontSize: "30px",
    left: "50%",
    transform: "translateX(-50%)"
  };

  lifeBarContainerStyle = {
    display: "flex",
    position: "relative",
    margin: "0 auto 0 0",
    backgroundColor: "#aaa",
    width: "100%"
  };

  render() {
    const { life, totalLife } = this.props.dweeb;
    return (
      <React.Fragment>
        <div style={this.lifeBarContainerStyle}>
          <div style={this.getLifeBarStyle(life, totalLife)}>
            <span style={this.lifeLabelStyle}>{`${life}/${totalLife}`}</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

DweebLife.propTypes = {
  dweeb: AppTypes.dweebType.isRequired
};

export default DweebLife;

