const mongoose = require("mongoose");
const HospitalModel = require("./hospitalSchema");
const AccountModel = require("./accountSchema");
const ProductModel = require("./productSchema");
const hospitals = require("../data/hospitals");
const accounts = require("../data/accounts");

let obj = {
  invoiceData: {
    vendor_id: "H01",
    partner_id: 101,
    name: "",
    emails: [],
    block_id: 101,
    type: "hospital",
    payment_method: "transfer",
    currency: "",
    conversion_rate: 1,
    electronic: true,
    vat: 0,
  },
  users: [],
  orderHistory: [],
};

async function populate(input) {
  if (input == "hospitals") {
    await HospitalModel.deleteMany({});
    // await HospitalModel.create(...hospitals);
    let newHospitals = [];
    hospitals.map(async (hosp) => {
      let obj = {
        vendor_id: "H",
        partner_id: "not populated yet",
        name: "",
        emails: ["randomaddress@email.com"],
        block_id: 101,
        type: "hospital",
        payment_method: "transfer",
        currency: "",
        conversion_rate: 1,
        electronic: true,
        vat: 0,
        country_code: hosp.country_code,
        post_code: hosp.post_code,
        city: hosp.city,
        address: hosp.address,
        taxcode: hosp.taxcode,
      };
      const users = [];
      const history = [];

      if (hosp.country == "Hungary") {
        obj.vat = 27;
        obj.currency = "HUF";
        obj.vendor_id = "H" + hospitals.indexOf(hosp).toString();
        obj.partner_id = hospitals.indexOf(hosp);
        obj.name = hosp.name;
      } else if (hosp.country == "Germany") {
        obj.vat = 19;
        obj.currency = "EUR";
        obj.conversion_rate = 0.0025;
        obj.vendor_id = "GER" + hospitals.indexOf(hosp).toString();
        obj.partner_id = hospitals.indexOf(hosp);
        obj.name = hosp.name;
      } else if (hosp.country == "Latvia") {
        obj.vat = 21;
        obj.currency = "EUR";
        obj.conversion_rate = 0.0025;
        obj.vendor_id = "LAT" + hospitals.indexOf(hosp).toString();
        obj.partner_id = hospitals.indexOf(hosp);
        obj.name = hosp.name;
      } else if (hosp.country == "Sweden") {
        obj.vat = 25;
        obj.currency = "KR";
        obj.conversion_rate = 0.0285;
        obj.vendor_id = "SWE" + hospitals.indexOf(hosp).toString();
        obj.partner_id = hospitals.indexOf(hosp);
        obj.name = hosp.name;
      } else {
        obj.vat = 27;
        obj.currency = "EUR";
        obj.conversion_rate = 0.0025;
        obj.vendor_id = "FOREIGN" + hospitals.indexOf(hosp).toString();
        obj.partner_id = hospitals.indexOf(hosp);
        obj.name = hosp.name;
      }
      hosp.partner_id = "not populated yet";
      hosp.invoiceData = obj;
      hosp.users = users;
      hosp.orderHistory = history;
      newHospitals.push(hosp);
    });
    await HospitalModel.create(...newHospitals);
    console.log("Hospitals have been populated");
  } else if (input == "accounts") {
    await AccountModel.deleteMany({});
    const findAll = await HospitalModel.find();
    let ids = [];
    findAll.map((hosp) => ids.push(hosp._id));
    let newUsers = [];
    accounts.map(async (account) => {
      account.hospitals.push(ids[0]);
      account.hospitals.push(ids[1]);
      ids.shift();
      ids.shift();
      newUsers.push(account);
    });
    console.log(newUsers);
    await AccountModel.create(newUsers);
    console.log(newUsers);
    console.log("Accounts have been populated");
  } else if (input == "products") {
    await ProductModel.deleteMany({});
    const products = [
      {
        name: "FFP2",
        id: 12818969,
        price: 500,
        quantity: 1000000,
      },
      {
        name: "KN95",
        id: 12826735,
        price: 600,
        quantity: 1000000,
      },
      {
        name: "FFP3",
        id: 12826737,
        price: 800,
        quantity: 855000,
      },
    ];
    await ProductModel.create(...products);
    console.log("Products have been filled up");
  } else {
    console.log(
      "This populate function can only handle hospitals, products, and accounts. What were you even trying to do, bro?"
    );
    return;
  }
}

async function main() {
  const url = "mongodb://127.0.0.1:27017/mask-stock";
  await mongoose.connect(url);
  await populate("hospitals");
  await populate("accounts");
  await populate("products");
  await mongoose.disconnect();
}

main().catch((err) => console.error(err));
