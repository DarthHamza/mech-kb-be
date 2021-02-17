const express = require("express");
const db = require("./db/models");
const productRoutes = require("./routes/products");
const shopRoutes = require("./routes/shops");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);
app.use("/shops", shopRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

const PORT = 8001;
db.sequelize.sync({ alter: true });
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
