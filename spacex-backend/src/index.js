import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./db/index.js";

import InsightsRouter from "./api/insights.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());
app.options("*", cors());

app.get("/health", (req, res) => {
  res.send("Health Check").status(200);
});

app.use("/insights", InsightsRouter);

app.listen(8082, () => {
  connectDB();
  console.log(`Running on PORT ${8082}`);
});
