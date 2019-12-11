function getLevelsArray() {
  let levelsArray = [];
  for (let i = 1; i <= 100; i++) {
    levelsArray.push(i);
  }
  return levelsArray;
}

const availableAttributes = [
  {
    attributeId: 1,
    attributeName: "level",
    attributeArray: getLevelsArray(),
    labelArray: ["Level ", ""]
  },
  {
    attributeId: 2,
    attributeName: "blockChance",
    attributeArray: [0, 3, 5, 10, 12, 15, 20, 25, 30, 50, 80, 100],
    labelArray: ["Block Chance: ", "%"]
  },
  {
    attributeId: 3,
    attributeName: "hpPlus",
    attributeArray: [0, 25, 50, 100, 200, 350, 500],
    labelArray: ["HP + ", ""]
  },
  {
    attributeId: 4,
    attributeName: "criticalChance",
    attributeArray: [0, 3, 5, 12, 15, 20, 35, 50, 100],
    labelArray: ["Critial Chance: ", "%"]
  }
];

export default availableAttributes;
