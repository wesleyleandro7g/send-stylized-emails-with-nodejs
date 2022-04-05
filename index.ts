import "reflect-metadata";
import "express-async-errors";

import http from "http";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import { MailsControllers } from "./src/controllers/MailsControllers";
import { InternalError } from "./src/config/generateError";

const mailsController = new MailsControllers();

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/img", express.static(path.resolve(__dirname, "img")));

app.get("/", (req: Request, res: Response) => {
  res.render("home");
});

app.get("/signUpRequest", (req: Request, res: Response) => {
  res.render("signUpRequest");
});

app.get("/test", mailsController.testConnection);
app.post("/simpleMail", mailsController.sendSimpleMailsTemplate);

app.use(
  (err: InternalError, req: Request, res: Response, next: NextFunction) => {
    if (err && err.statusCode) {
      res
        .status(err.statusCode)
        .json({ name: err.name, status: err.statusCode, message: err.message });
    }
  }
);

const server = http.createServer(app);

const PORT = +process.env.PORT || 3333;
const HOST = "0.0.0.0";

console.log(`server running on port ${PORT}`);

server.listen(PORT, HOST);
