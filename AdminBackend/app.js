const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const bodyyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyyParser.json());
app.use(bodyyParser.urlencoded({ extended: true }));

const adminRoutes = require("./routes/admin-routes");
const adminReceipeRoutes = require("./routes/adminReceipe-routes");
const database = require("./utils/database");

app.use("/admin", adminRoutes);
app.use("/admin/receipe", adminReceipeRoutes);

database
  .sync() // Use { alter: true } to modify tables without dropping data # {force:true}
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("Server is running on port:", process.env.PORT || 4000);
    });
  })
  .catch((error) => {
    console.error("Database sync failed:", error);
  });
