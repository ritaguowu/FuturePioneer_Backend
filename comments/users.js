const users = [
  {
    id: 1,
    // name: "Mosh",
    // email: "mosh@domain.com",
    name: "Wu",
    email: "wu@aa.com",
    password: "aaaaa",
    image: { fileName: "shoes1" },
  },
  {
    id: 2,
    name: "John",
    email: "john@domain.com",
    password: "12345",
    image: { fileName: "shoes2" },
  },
];

const getUsers = () => users;

const getUserById = (id) => users.find((user) => user.id === id);

const getUserByEmail = (email) => users.find((user) => user.email === email);

const addUser = (user) => {
  user.id = users.length + 1;
  users.push(user);
};

const updateUser = (user) => {
  const userNew = getUserByEmail(user.email);
  userNew.image = user.image[0];
  // console.log(userNew);
};

module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  addUser,
  updateUser,
};
