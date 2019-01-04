const mongoose = require("mongoose");

mongoose.Promise = global.Promise;


mongoose.connect("YOUR_MONGO_DB_CONNECTION").then(() => console.log("Mongodb Connected")).catch(err => console.log("There is an error" + err));