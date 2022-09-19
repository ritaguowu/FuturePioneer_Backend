const listings = [
  {
    id: 201,
    courseId: 3,
    levelId: 1,
    description: "My son loved it!!",
    images: [{ fileName: "jacket1" }],
    userId: 1,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    userName: "Wu",
  },
  {
    id: 3,
    courseId: 2,
    levelId: 2,
    description: "Very good course!",
    images: [{ fileName: "couch2" }],
    userId: 2,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    userName: "Wu",
  },
  {
    id: 1,
    courseId: 1,
    levelId: 3,
    description: "Too young to learn this course for my girl!",
    images: [
      { fileName: "couch1" },
      { fileName: "couch2" },
      { fileName: "couch3" },
    ],
    userId: 1,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 2,
    courseId: 2,
    levelId: 1,
    description: "My son loved it!!",
    images: [{ fileName: "shoes1" }],
    userId: 2,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 102,
    courseId: 2,
    levelId: 1,
    description: "My son loved it!!",
    images: [{ fileName: "camera1" }],
    price: 300,
    categoryId: 3,
    userId: 1,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 101,
    courseId: 2,
    levelId: 4,
    description: "My son loved it!!",
    images: [{ fileName: "camera2" }],
    price: 350,
    categoryId: 3,
    userId: 1,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 4,
    title: "Sectional couch - Delivery available",
    description: "No rips no stains no odors",
    images: [{ fileName: "couch3" }],
    categoryId: 1,
    price: 950,
    userId: 2,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 6,
    title: "Brown leather shoes",
    description: "My son loved it!!",
    images: [{ fileName: "shoes2" }],
    categoryId: 5,
    price: 50,
    userId: 2,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
];

const addListing = (listing) => {
  listing.id = listings.length + 1;
  listings.unshift(listing);
};

const getListings = () => listings;

const getListing = (id) => listings.find((listing) => listing.id === id);

const filterListings = (predicate) => listings.filter(predicate);

module.exports = {
  addListing,
  getListings,
  getListing,
  filterListings,
};
