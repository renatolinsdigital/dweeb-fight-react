import _ from "lodash";

function randomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function buildHitValue(hittingDweeb, beeatenDweeb) {
  let hitValue = randomNumber() <= beeatenDweeb.blockChance ? 0 : 1;
  hitValue =
    randomNumber() <= hittingDweeb.criticalChance ? (hitValue *= 2) : hitValue;
  hitValue =
    hitValue * (Math.random() * hittingDweeb.strength + hittingDweeb.level / 2);
  hitValue = Math.round(hitValue);
  return hitValue;
}

function handleFight(dweeb1, dweeb2) {
  let dweeb1Clone = _.cloneDeep(dweeb1);
  let dweeb2Clone = _.cloneDeep(dweeb2);
  dweeb1Clone.life -= dweeb2.lastHit;
  dweeb2Clone.life -= dweeb1.lastHit;
  if (dweeb1Clone.life < 0) dweeb1Clone.life = 0;
  if (dweeb2Clone.life < 0) dweeb2Clone.life = 0;
  if (dweeb2.lastHit > 0) dweeb1Clone.hurted = true;
  if (dweeb1.lastHit > 0) dweeb2Clone.hurted = true;
  return _.concat(dweeb1Clone, dweeb2Clone);
}

function fight(dweebs) {
  const dweeb1 = _.cloneDeep(dweebs[0]);
  const dweeb2 = _.cloneDeep(dweebs[1]);
  dweeb1.lastHit = buildHitValue(dweeb1, dweeb2);
  dweeb2.lastHit = buildHitValue(dweeb2, dweeb1);
  const dweebsAfterFight = handleFight(dweeb1, dweeb2);
  return dweebsAfterFight;
}

export default fight;
