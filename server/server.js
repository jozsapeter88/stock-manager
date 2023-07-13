const mongoose = require("mongoose");
const HospitalModel = require("./db/hospitalSchema");
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
    res.status(200).json({ message: "Jóvanmá" });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/api/hospitals", async (req, res) => {
  console.log("/hospitals accessed");
  try {
    const hospitals = await HospitalModel.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/api/hospitals", async (req, res) => {
  console.log("/new hospitals accessed");
  try {
    const hospitals = await HospitalModel.find();
    res.status(200).json(hospitals);
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

app.get("/hospitals/mine/:id", async (req, res) => {
  console.log("/hospitals/mine accessed by id: " + req.params.id);
  try {
    let hospitalList = [];
    const user = await AccountModel.findOne({ _id: req.params.id });
    const hospitals = await HospitalModel.find({});
    hospitals.map((hosp) => {
      if (user.hospitals.includes(hosp._id)) {
        hospitalList.push(hosp);
      }
    });
    res.status(200).json(hospitalList);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/hospitals/mine/:id", async (req, res) => {
  console.log("a new hospital is being added by doctor " + req.params.id);
  try {
    const hospitalObj = createObjectForBillingo(req.body);
    let data = await fetch("https://api.billingo.hu/v3/partners", {
      method: "POST",
      headers: {
        "X-API-KEY": "0d08f68e-a85f-11ed-b5d0-06ac9760f844",
      },
      body: JSON.stringify(hospitalObj),
    });
    data = await data.json();
    console.log(data);
    console.log(data.id);

    const newHospital = {
      name: req.body.name,
      country_code: req.body.country_code,
      post_code: req.body.post_code,
      city: req.body.city,
      address: req.body.address,
      partner_id: data.id,
      invoiceData: { emails: req.body.email, taxcode: req.body.taxcode },
      users: [req.params.id],
    };
    await HospitalModel.create(newHospital);
    const findNew = await HospitalModel.findOne({ name: newHospital.name });
    const doctor = await AccountModel.findOne({ _id: req.params.id });
    doctor.hospitals.push(findNew._id);
    doctor.save();
    res
      .status(200)
      .json({ message: `New hospital added to user ${doctor.name}` });
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
      hospitals: [],
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

// ---------------- Alt versions START -----------------------//

app.get("/hospitals/mine/Peti/:id", async (req, res) => {
  try {
    const user = await AccountModel.findOne({ _id: req.params.id });
    let hospitalList = ["Peti"];
    const promises = user.hospitals.map(async (hosp) => {
      return await HospitalModel.findOne({ _id: hosp });
    });
    hospitalList = hospitalList.concat(await Promise.all(promises));
    console.log(hospitalList);
    res.status(200).json(hospitalList);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/hospitals/mine/asdfasdf/:id", async (req, res) => {
  try {
    const user = await AccountModel.findOne({ _id: req.params.id });
    let hospitalList = [];
    user.hospitals.map(async (hosp) => {
      const currentHosp = await HospitalModel.findOne({ _id: hosp });
      hospitalList.push(currentHosp);
      console.log(hospitalList);
    });
    console.log("76: ", hospitalList);
    res.status(200).json(hospitalList);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ---------------- Alt versions END -----------------------//

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
    const hospital = await HospitalModel.findOne({ _id: req.params.id });
    let response;
    if (hospital.orderHistory.length == 0) {
      response = [
        {
          date: "",
          client: hospital.name,
          items: [""],
          message: "Order history is empty.",
        },
      ];
    } else {
      response = hospital.orderHistory;
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
    const hospID = req.body.client;
    const userID = req.body.user;
    const user = await AccountModel.find({ _id: userID });
    const hospital = await HospitalModel.findOne({ _id: hospID });

    const newOrder = {
      date: new Date(),
      client: hospital.name,
      invoiceData: hospital.invoiceData,
      items: orderData,
    };
    await OrderHistory.create(newOrder);
    const invoice = await exchangeDataWAPI(hospital, orderData, user);
    if (invoice) {
      hospital.orderHistory.push(newOrder);
      hospital.save();
      res.status(200).json(invoice);
      console.log("elment");
    } else res.status(200).json("Not enough masks");
  } catch (error) {
    res.status(500).json(error);
  }
});

async function main() {
  const url = "mongodb://127.0.0.1:27017/mask-stock";

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

async function exchangeDataWAPI(hospital, orderData, user) {
  console.log("API started");
  let date = new Date();
  date = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
  console.log(date);
  const maskvendor = `maskvendor${Math.ceil(Math.random())}`;
  let invoiceObj = {
    vendor_id: maskvendor,
    partner_id: hospital.partner_id,
    block_id: 0,
    bank_account_id: 0,
    type: "advance",
    fulfillment_date: date,
    due_date: date,
    payment_method: "elore_utalas",
    language: "hu",
    currency: hospital.invoiceData.currency,
    conversion_rate: 1,
    electronic: false,
    paid: false,
    items: [],
    comment: "string",
    settings: {
      mediated_service: false,
      without_financial_fulfillment: false,
      online_payment: "",
      round: "five",
      no_send_onlineszamla_by_user: true,
      order_number: "string",
      place_id: 0,
      instant_payment: true,
      selected_type: "advance",
    },
    discount: {
      type: "percent",
      value: 0,
    },
    instant_payment: true,
  };
  orderData.map((obj) => {
    let trialObj = {
      first: {
        product_id: obj.product_id,
        quantity: obj.quantity,
        comment: "string",
      },
    };
    invoiceObj.items.push(trialObj.first);
  });
  let data = await fetch("https://api.billingo.hu/v3/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "0d08f68e-a85f-11ed-b5d0-06ac9760f844",
    },
    body: JSON.stringify(invoiceObj),
  });
  data = await data.json();

  console.log(data);
  console.log("Sikeres api fetch");
  return data;
}
