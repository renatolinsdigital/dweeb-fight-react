import _ from "lodash";

function randomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function fight(dweebs) {
  const dweebsCopy = _.cloneDeep(dweebs);
  const dweeb1 = dweebsCopy[0];
  const dweeb2 = dweebsCopy[1];

  //Inflicts an initial value of 0 or 1(missed or attacked) based on enemy's block chance
  let dweeb1Hit = randomNumber() <= dweeb2.blockChance ? 0 : 1;
  let dweeb2Hit = randomNumber() <= dweeb1.blockChance ? 0 : 1;

  //If it hits, the value goes times 2 on critical, increasing the attack coefficient/ratio
  dweeb1Hit =
    randomNumber() <= dweeb1.criticalChance ? (dweeb1Hit *= 2) : dweeb1Hit;
  dweeb2Hit =
    randomNumber() <= dweeb2.criticalChance ? (dweeb2Hit *= 2) : dweeb2Hit;

  // main damage logic: multiplies the coefficient we've obtained and mixes with dweeb's properties
  dweeb1Hit = dweeb1Hit * (Math.random() * dweeb1.strength + dweeb1.level / 2);
  dweeb1Hit = Math.round(dweeb1Hit);
  dweeb2Hit = dweeb2Hit * (Math.random() * dweeb2.strength + dweeb2.level / 2);
  dweeb2Hit = Math.round(dweeb2Hit);

  // inflicts damage each other
  dweeb1.life -= dweeb2Hit;
  dweeb2.life -= dweeb1Hit;

  // play handling
  if (dweeb1.life < 0) dweeb1.life = 0;
  if (dweeb2.life < 0) dweeb2.life = 0;

  dweeb1.lastHit = dweeb1Hit;
  dweeb2.lastHit = dweeb2Hit;

  if (dweeb2Hit > 0) dweeb1.hurted = true;
  if (dweeb1Hit > 0) dweeb2.hurted = true;

  const dweebsAfterFight = _.concat(dweeb1, dweeb2);

  return dweebsAfterFight;
}

export default fight;
