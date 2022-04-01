import http from "http";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import transporter from "./src/config/smtp";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.render("home", {
    title: "Desencoder",
  });
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else if (success) {
    console.log("smtp service connected!");
  }
});

const server = http.createServer(app);

const PORT = +process.env.PORT || 3333;
const HOST = "0.0.0.0";

console.log(`server running on port ${PORT}`);

server.listen(PORT, HOST);
