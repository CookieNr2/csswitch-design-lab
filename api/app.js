require("dotenv").config();

const express = require("express");
require("./configs/db.config");

const app = express();
app.use(express.json());

// Routes

const router = require("./configs/routes.config");
app.use("/api/v1", router);

// Error handlers

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({ message: "Internal Server Error" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Application running at port ${port}`));
