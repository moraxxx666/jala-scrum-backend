import mongoose from "mongoose"
import config from "./config"
mongoose.connect(
  `${config.MONGO_URL}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) console.error(err);
    console.log("Base de datos conectada");
  }
);
