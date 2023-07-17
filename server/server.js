const mongoose = require("mongoose");
const FacilityModel = require("./db/facilitySchema");
const AccountModel = require("./db/accountSchema");
const OrderHistory = require("./db/orderHistorySchema");
const ItemModel = require("./db/itemSchema");
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

app.get("/facilities/mine/Peti/:id", async (req, res) => {
  try {
    const user = await AccountModel.findOne({ _id: req.params.id });
    let facilityList = ["Peti"];
    const promises = user.facilities.map(async (fac) => {
      return await FacilityModel.findOne({ _id: fac });
    });
    facilityList = facilityList.concat(await Promise.all(promises));
    console.log(facilityList);
    res.status(200).json(facilityList);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/orderhistory/:id", async (req, res) => {
  try {
    const facility = await FacilityModel.findOne({ _id: req.params.id });
    let response;
    if (facility.orderHistory.length == 0) {
      response = [
        {
          date: "",
          client: facility.name,
          items: [""],
          message: "Order history is empty.",
        },
      ];
    } else {
      response = facility.orderHistory;
    }
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    res.status(500).json(error);
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

app.post("/order", async (req, res) => {
  console.log("/order accessed");
  console.log(req.body.order);
  console.log(req.body.client);
  console.log(req.body.user);
  try {
    const orderData = req.body.order;
    const facID = req.body.client;
    const userID = req.body.user;
    const user = await AccountModel.find({ _id: userID });
    const facility = await FacilityModel.findOne({ _id: facID });

    const newOrder = {
      date: new Date(),
      client: facility.name,
      invoiceData: facility.invoiceData,
      items: orderData,
    };
    await OrderHistory.create(newOrder);
    const invoice = await exchangeDataWAPI(facility, orderData, user);
    if (invoice) {
      facility.orderHistory.push(newOrder);
      facility.save();
      res.status(200).json(invoice);
      console.log("elment");
    } else res.status(200).json("Not enough masks");
  } catch (error) {
    res.status(500).json(error);
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
