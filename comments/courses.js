const courses = [
  {
    id: 1,
    name: "Scratch",
  },
  {
    id: 2,
    name: "Python",
  },
  {
    id: 3,
    name: "Java",
  },
];

const getCourses = () => courses;

const getCourse = (id) => courses.find((c) => c.id === id);

module.exports = {
  getCourses,
  getCourse,
};
