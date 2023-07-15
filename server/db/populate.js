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
      {
        name: "Product 1",
        id: 1,
        price: 9.99,
        quantity: 10,
      },
      {
        name: "Product 2",
        id: 2,
        price: 19.99,
        quantity: 5,
      },
      // Add more products
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
