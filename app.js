require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/db");
const authRouter = require("./routes/route");
const cors = require("cors")

app.use(cors())


app.use(express.json())
app.use("/api/admin", authRouter);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is started on port ${process.env.PORT}`);
  });
});
