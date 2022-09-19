const levels = [
  {
    id: 1,
    name: "Level 1",
  },
  {
    id: 2,
    name: "Level 2",
  },
  {
    id: 3,
    name: "Level 3",
  },
  {
    id: 4,
    name: "Level 4",
  },
];

const getLevels = () => levels;

const getLevel = (id) => levels.find((c) => c.id === id);

module.exports = {
  getLevels,
  getLevel,
};
