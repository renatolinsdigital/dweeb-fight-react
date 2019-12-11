import AppTypes from "../types";
import _ from "lodash";

function updateLife(dweebForEvaluation) {
  let dweeb = { ...dweebForEvaluation };
  dweeb.strength = 10 + (( dweeb.level / 20 ) * 40 ); 
  dweeb.baseLife = Math.floor(Math.pow(2, 8 + dweeb.level / 50)) - 99; // Just because ;)
  dweeb.totalLife = dweeb.baseLife + dweeb.hpPlus;
  dweeb.life = dweeb.totalLife;
  return dweeb;
}

// basically updates life and luck
function evaluateDweebUpdate(dweeb) {
  let evaluatedDweeb = _.cloneDeep(dweeb);
  evaluatedDweeb = updateLife(evaluatedDweeb);
  return evaluatedDweeb;
}

evaluateDweebUpdate.propTypes = {
  dweeb: AppTypes.dweebType.isRequired
};

export default evaluateDweebUpdate;
