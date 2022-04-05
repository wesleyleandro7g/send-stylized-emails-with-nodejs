import { Request, Response } from "express";
import { InternalError } from "../config/generateError";
import transporter from "../config/smtp";
import hbs from "handlebars";
import path from "path";
import fs from "fs";
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
    const emailTemplate = fs.readFileSync(
      path.resolve("src/layouts/template1.hbs"),
      "utf-8"
    );

    const template = hbs.compile(emailTemplate);

    const html = template({
      companyName: "Aqui vai o nome da empresa",
    });

    var mailOptions = {
      from: "wesleyleandro.dev@gmail.com",
      to: "wesleyleandrosantos14@gmail.com",
      subject: "Test mails template",
      html,
    };

    transporter.sendMail(mailOptions, function (err, info) {
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

export { MailsControllers };
