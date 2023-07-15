const mongoose = require("mongoose");
const Facility = require("./facilitySchema.js");
const Product = require("./productSchema.js");

mongoose.connect("mongodb://127.0.0.1:27017/stock-manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const generateFacilities = async () => {
  try {
    await Facility.deleteMany({});
    console.log("Facilities collection cleared.");

    const facilities = [
      {
        name: "Thunderdome Arena",
        sport: "Combat Sports",
        country_code: "US",
        post_code: "12345",
        city: "Reactville",
        address: "123 Main Street",
        users: [],
      },
      {
        name: "Stormwatch Stadium",
        sport: "Soccer",
        country_code: "UK",
        post_code: "67890",
        city: "Reactville",
        address: "456 High Street",
        users: [],
      },
      {
        name: "Gridiron Grounds",
        sport: "American Football",
        country_code: "US",
        post_code: "54321",
        city: "Reactville",
        address: "789 Elm Avenue",
        users: [],
      },
      {
        name: "Mystic Court",
        sport: "Basketball",
        country_code: "US",
        post_code: "13579",
        city: "Reactville",
        address: "321 Oak Lane",
        users: [],
      },
      {
        name: "Celestial Tennis Courts",
        sport: "Tennis",
        country_code: "UK",
        post_code: "24680",
        city: "Reactville",
        address: "987 Pine Road",
        users: [],
      },
      {
        name: "Aquatic Arena",
        sport: "Swimming",
        country_code: "US",
        post_code: "97531",
        city: "Reactville",
        address: "654 Maple Avenue",
        users: [],
      },
    ];

    await Facility.insertMany(facilities);
    console.log("Facilities created successfully!");
  } catch (error) {
    console.error("Error creating facilities:", error);
    throw error;
  }
};

const generateProducts = async () => {
  try {
    await Product.deleteMany({});
    console.log("Products collection cleared.");

    const products = [
      // Soccer products
      {
        name: "Soccer Ball 1",
        sport: "Soccer",
        price: 24.99,
        quantity: 20,
      },
      {
        name: "Soccer Cleats",
        sport: "Soccer",
        price: 89.99,
        quantity: 8,
      },
      {
        name: "Soccer Jersey",
        sport: "Soccer",
        price: 49.99,
        quantity: 12,
      },
      {
        name: "Soccer Goal",
        sport: "Soccer",
        price: 149.99,
        quantity: 5,
      },
      {
        name: "Soccer Training Cones",
        sport: "Soccer",
        price: 9.99,
        quantity: 30,
      },
      // American Football products
      {
        name: "Football 1",
        sport: "American Football",
        price: 29.99,
        quantity: 15,
      },
      {
        name: "Football Helmet",
        sport: "American Football",
        price: 159.99,
        quantity: 8,
      },
      {
        name: "Football Gloves",
        sport: "American Football",
        price: 39.99,
        quantity: 20,
      },
      {
        name: "Football Shoulder Pads",
        sport: "American Football",
        price: 89.99,
        quantity: 12,
      },
      {
        name: "Football Cones",
        sport: "American Football",
        price: 9.99,
        quantity: 30,
      },
      // Basketball products
      {
        name: "Basketball 1",
        sport: "Basketball",
        price: 24.99,
        quantity: 20,
      },
      {
        name: "Basketball Shoes",
        sport: "Basketball",
        price: 99.99,
        quantity: 8,
      },
      {
        name: "Basketball Jersey",
        sport: "Basketball",
        price: 49.99,
        quantity: 12,
      },
      {
        name: "Basketball Hoop",
        sport: "Basketball",
        price: 199.99,
        quantity: 5,
      },
      {
        name: "Basketball Training Cones",
        sport: "Basketball",
        price: 9.99,
        quantity: 30,
      },
      // Tennis products
      {
        name: "Tennis Racket 1",
        sport: "Tennis",
        price: 59.99,
        quantity: 10,
      },
      {
        name: "Tennis Balls",
        sport: "Tennis",
        price: 14.99,
        quantity: 50,
      },
      {
        name: "Tennis Shoes",
        sport: "Tennis",
        price: 79.99,
        quantity: 8,
      },
      {
        name: "Tennis Bag",
        sport: "Tennis",
        price: 39.99,
        quantity: 15,
      },
      {
        name: "Tennis Training Cones",
        sport: "Tennis",
        price: 9.99,
        quantity: 30,
      },
      // Swimming products
      {
        name: "Swimming Goggles 1",
        sport: "Swimming",
        price: 14.99,
        quantity: 20,
      },
      {
        name: "Swimming Cap",
        sport: "Swimming",
        price: 9.99,
        quantity: 30,
      },
      {
        name: "Swimming Fins",
        sport: "Swimming",
        price: 29.99,
        quantity: 15,
      },
      {
        name: "Swimming Kickboard",
        sport: "Swimming",
        price: 19.99,
        quantity: 20,
      },
      {
        name: "Swimming Training Cones",
        sport: "Swimming",
        price: 9.99,
        quantity: 30,
      },
    ];

    await Product.insertMany(products);
    console.log("Products created successfully!");
  } catch (error) {
    console.error("Error creating products:", error);
    throw error;
  }
};

const populateDatabase = async () => {
  try {
    await generateFacilities();
    await generateProducts();
    console.log("Database population completed!");
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    mongoose.disconnect();
  }
};

populateDatabase();
