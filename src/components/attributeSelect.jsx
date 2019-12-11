import React, { Component } from "react";
import PropTypes from "prop-types";
import AppTypes from "../types";
import store from "../store/store";

class AttributeSelect extends Component {
  handleAttributeChange = (newAttribute, dweeb) => {
    let updatedDweeb = { ...dweeb };
    updatedDweeb[this.props.attributeName] = parseInt(newAttribute);
    this.props.handleDweebUpdate(updatedDweeb);
  };

  render() {
    const { dweeb } = this.props;
    const [labelBefore, labelAfter] = this.props.labelArray;
    let optionsKey = -1;
    const gameEnded = !store.getState().gameState.playing;

    return (
      <React.Fragment>
        <select disabled={gameEnded}
          value={dweeb[this.props.attributeName]}
          onChange={e => this.handleAttributeChange(e.target.value, dweeb)}
        >
          {this.props.attributeArray.map(attribute => {
            optionsKey++;
            return (
              <option key={optionsKey} value={attribute}>
                {`${labelBefore} ${attribute} ${labelAfter}`}
              </option>
            );
          })}
        </select>
      </React.Fragment>
    );
  }
}

AttributeSelect.propTypes = {
  dweeb: AppTypes.dweebType.isRequired,
  attributeName: PropTypes.string.isRequired,
  attributeArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  labelArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDweebUpdate: PropTypes.func.isRequired
};

export default AttributeSelect;
