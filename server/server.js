const mongoose = require("mongoose");
const FacilityModel = require("./db/facilitySchema");
const AccountModel = require("./db/accountSchema");
const OrderHistory = require("./db/orderHistorySchema");
const ProductModel = require("./db/productSchema");
const cors = require("cors");

const express = require("express");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

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

app.post("/facilities/mine/:id", async (req, res) => {
  console.log("a new facility is being added by doctor " + req.params.id);
  try {
    const newFacility = {
      name: req.body.name,
      country_code: req.body.country_code,
      post_code: req.body.post_code,
      city: req.body.city,
      address: req.body.address,
      users: [req.params.id],
    };
    await FacilityModel.create(newFacility);
    const findNew = await FacilityModel.findOne({ name: newFacility.name });
    const doctor = await AccountModel.findOne({ _id: req.params.id });
    doctor.facilities.push(findNew._id);
    doctor.save();
    res
      .status(200)
      .json({ message: `New facility added to user ${doctor.name}` });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/accounts/new", async (req, res) => {
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

app.post("/login", async (req, res) => {
  const userName = req.body.userName;
  console.log("/login accessed by " + userName);
  const errorMessage = "Invalid username or password!";
  try {
    try {
      const user = await AccountModel.findOne({ userName: userName });
      const responseObj = {
        status: "",
        content: "",
      };

      if (user.passWord == req.body.passWord) {
        responseObj.status = "OK";
        responseObj.content = user._id;
        res.status(200).json(responseObj);
      } else {
        responseObj.status = "NO";
        responseObj.content = errorMessage;
        res.status(406).json(responseObj);
      }
    } catch (error) {
      res.status(418).json(errorMessage);
    }
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

app.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
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
  const url = "mongodb://127.0.0.1:27017/stock-manager";-

  await mongoose.connect(url);
  const port = 5001;
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
