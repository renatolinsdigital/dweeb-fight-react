import React, { Component } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import AttributeSelect from "./components/attributeSelect";
import availableAttributes from "./configs/availableAttributes";
import GameMessages from "./components/gameMessages";
import DweebLife from "./components/dweebLife";
import { messageUpdate, dweebUpdate, fight } from "./store/actions";
import {
  EVALUATE_DWEEB_UPDATE,
  FIGHT,
  DWEEB_UPDATED_MESSAGE
} from "./store/actionTypes";
import { connect } from "react-redux";
import gameStart from "./game-logic/gameStart";
import _ from "lodash";
import store from "./store/store";
import AboutModal from "./components/aboutModal";

class App extends Component {
  componentDidMount() {
    gameStart(true);
  }

  handleDweebUpdate = updatedDweeb => {
    this.props.dweebUpdate(EVALUATE_DWEEB_UPDATE, updatedDweeb);
    store.dispatch(DWEEB_UPDATED_MESSAGE);
  };

  renderControls = dweeb => {
    const fightAction = () => this.props.fight(FIGHT, this.props.dweebs);
    if (dweeb.id === 1) {
      return (
        <div className="controls">
          <button className="start" onClick={() => gameStart(false)}>
            Start Game
          </button>
          <button className="fight" onClick={fightAction}>
            FIGHT !
          </button>
          <GameMessages />
        </div>
      );
    }
  };

  listAvailableAttributes = dweeb => {
    return (
      <React.Fragment>
        {availableAttributes.map(attrSet => {
          return (
            <AttributeSelect
              key={attrSet.attributeId}
              dweeb={dweeb}
              attributeName={attrSet.attributeName}
              attributeArray={attrSet.attributeArray}
              labelArray={attrSet.labelArray}
              handleDweebUpdate={this.handleDweebUpdate}
            />
          );
        })}
      </React.Fragment>
    );
  };

  getActionStyle(dweeb) {
    switch (true) {
      case dweeb.life > 0: {
        return {
          backgroundColor: dweeb.hurted ? "red" : "#f7931e"
        };
      }
      default:
        return {
          backgroundColor: "gray"
        };
    }
  }

  render() {
    return (
      <React.Fragment>
        <AboutModal />
        <Header />

        <main className="App">
          <div className="game-wrapper">
            {this.props.dweebs.map(dweeb => {
              return (
                <React.Fragment key={dweeb.id}>
                  <div
                    className="dweeb-container"
                    style={this.getActionStyle(dweeb)}
                  >
                    <p className="dweeb-name">{dweeb.name}</p>
                    <img
                      className="dweeb-image"
                      src={dweeb.image}
                      alt={dweeb.name}
                    />
                    <div className="attributes-selection">
                      {this.listAvailableAttributes(dweeb)}
                    </div>

                    <DweebLife dweeb={dweeb} />
                  </div>

                  {this.renderControls(dweeb)}
                </React.Fragment>
              );
            })}
          </div>
        </main>

        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  dweebs: _.values(state.dweebs)
});

export default connect(mapStateToProps, { messageUpdate, dweebUpdate, fight })(
  App
);
