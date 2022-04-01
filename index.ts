import http from "http";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("SERVER IS RUNNING!");
});

const server = http.createServer(app);

const PORT = +process.env.PORT || 3333;
const HOST = "0.0.0.0";

console.log(`SERVER IS RUNNING ON PORT ${PORT}`);

server.listen(PORT, HOST);
