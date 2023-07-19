const mongoose = require("mongoose");
const FacilityModel = require("./db/facilitySchema");
const AccountModel = require("./db/accountSchema");
const ItemModel = require("./db/itemSchema");
const OrderModel = require("./db/orderSchema");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/try", (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/api/facilities", async (req, res) => {
  try {
    const facilities = await FacilityModel.find();
    res.status(200).json(facilities);
    console.log(facilities);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.post("/api/facilities", async (req, res) => {
  try {
    const facilities = await FacilityModel.find();
    res.status(200).json(facilities);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/api/accounts/new", async (req, res) => {
  try {
    const { name, userName, passWord } = req.body;

    const newAccount = new AccountModel({
      name,
      userName,
      passWord,
    });

    await newAccount.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the account by username
    const account = await AccountModel.findOne({ userName: username });

    if (!account) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the submitted password with the stored password
    if (account.passWord !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed" });
  }
});

app.get("/accounts", async (req, res) => {
  try {
    const accounts = await AccountModel.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/facilities/mine/:id", async (req, res) => {
  console.log("/facilities/mine accessed by id: " + req.params.id);
  try {
    let facilityList = [];
    const user = await AccountModel.findOne({ _id: req.params.id });
    const facilities = await FacilityModel.find({});
    facilities.map((fac) => {
      if (user.facilities.includes(fac._id)) {
        facilityList.push(fac);
      }
    });
    res.status(200).json(facilityList);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/api/facilities/:id", async (req, res) => {
  try {
    const facilityId = req.params.id;
    const facility = await FacilityModel.findById(facilityId);

    if (!facility) {
      return res.status(404).json({ error: "Facility not found" });
    }

    res.status(200).json(facility);
  } catch (error) {
    console.error("Error fetching facility details:", error);
    res.status(500).json({ error: "Error fetching facility details" });
  }
});

app.post("/api/accounts/new", async (req, res) => {
  console.log("accounts/new accessed");
  try {
    const newUser = {
      name: req.body.name,
      userName: req.body.userName,
      passWord: req.body.passWord,
      facilities: [],
    };
    await AccountModel.create(newUser);
    console.log(`New user added: ${newUser.name}`);
    res
      .status(200)
      .json({ message: `${newUser.name} has been added as a new user.` });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const { facility, items, quantity, comment } = req.body;

    const newOrder = new OrderModel({
      facility: facility,
      items: items,
      quantity: quantity,
      comment: comment,
    });

    await newOrder.save();

    res.status(200).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Error placing order" });
  }
});

app.get("/api/order-history", async (req, res) => {
  try {
    const orderHistory = await OrderModel.find().populate("items", "name");
    res.status(200).json(orderHistory);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ error: "Failed to fetch order history" });
  }
});


app.get("/api/items", async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Error retrieving items" });
  }
});

async function main() {
  const url = "mongodb://127.0.0.1:27017/stock-manager";
  -(await mongoose.connect(url));
  const port = 5001;
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
