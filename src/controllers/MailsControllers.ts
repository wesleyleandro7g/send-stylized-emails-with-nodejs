import { Request, Response } from "express";
import { InternalError } from "../config/generateError";
import transporter from "../config/smtp";
import ejs from "ejs";
import path from "path";

class MailsControllers {
  async testConnection(req: Request, res: Response) {
    transporter.verify((error, success) => {
      if (success) {
        return res.status(200).json({ message: "smpt service connected!" });
      } else {
        throw new InternalError("connection failed!", 400);
      }
    });
  }

  async sendSimpleMailsTemplate(req: Request, res: Response) {
    ejs.renderFile(
      path.resolve("src", "layouts", "simpleTemplate.ejs"),
      { name: "Izaque" },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var mainOptions = {
            from: "wesleyleandro.dev@gmail.com",
            to: "wesleyleandrosantos14@gmail.com",
            subject: "Test mails template",
            html: data,
          };

          transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
              res.json({
                msg: "fail",
              });
            } else {
              res.json({
                msg: "success",
              });
            }
          });
        }
      }
    );
  }
}

export { MailsControllers };
