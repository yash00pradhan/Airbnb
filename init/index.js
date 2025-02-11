const mongoose = require('mongoose');
const Listing = require('../models/listing.js');
const initData = require('./data.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Db connected successfully")
})
.catch((err)=>{console.log(err)})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
    await Listing.deleteMany({});
    // adding new porperties as owner
    initData.data = initData.data.map((obj)=>({...obj, owner: "67a794c0a55be8d071b4cf5a"}));
    await Listing.insertMany(initData.data);
    console.log("Data was intialized");
}

initDB();