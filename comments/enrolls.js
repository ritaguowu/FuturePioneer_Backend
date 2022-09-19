const enrolls = [
  // {
  //   id: 1,
  //   courseId: 1,
  //   levelId: 1,
  //   userId: 1,
  //   gradeId: 3,
  //   kidName: "Lien",
  //   phone: "67567",
  //   price: "258",
  //   images: [{ fileName: "shoes1" }],
  // },
  // {
  //   id: 2,
  //   courseId: 2,
  //   levelId: 2,
  //   gradeId: 3,
  //   userId: 2,
  //   kidName: "Kevin",
  //   phone: "1231524",
  //   price: "358",
  //   images: [{ fileName: "shoes2" }],
  // },
  // {
  //   id: 3,
  //   courseId: 3,
  //   levelId: 3,
  //   gradeId: 3,
  //   userId: 1,
  //   kidName: "Patric",
  //   phone: "2154",
  //   price: "458",
  //   images: [{ fileName: "couch1" }],
  // },
];

const addEnroll = (enroll) => {
  enroll.id = enrolls.length + 1;
  enrolls.push(enroll);
};

const getEnrolls = () => enrolls;

const getUserByCourseAndLevel = (courseId, levelId, kidName) => {
  console.log(courseId, levelId, kidName);
  return enrolls.find(
    (enroll) =>
      enroll.courseId.toString() === courseId.toString() &&
      enroll.levelId.toString() === levelId.toString() &&
      enroll.kidName.toLowerCase() === kidName.toLowerCase()
  );
};

const deleteEnroll = (id) => {
  console.log("id" + id);
  const enroll = enrolls.find((enroll) => enroll.id === id);
  enrolls.splice(enrolls.indexOf(enroll), 1);
};

const getEnroll = (id) => enrolls.find((enroll) => enroll.id === id);

const filterEnrolls = (predicate) => enrolls.filter(predicate);

module.exports = {
  addEnroll,
  getEnrolls,
  getEnroll,
  filterEnrolls,
  getUserByCourseAndLevel,
  deleteEnroll,
};
