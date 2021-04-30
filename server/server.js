const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoute = require("./routes/userRoute");

const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
