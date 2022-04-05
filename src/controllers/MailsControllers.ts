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

  /*   async sendSimpleMailsTemplate(req: Request, res: Response) {
    ejs.renderFile(
      path.resolve("src", "layouts", "layout1.ejs"),
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var mainOptions = {
            from: "izaquedione@gmail.com",
            to: "izaquenunes560@gmail.com",
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
  } */

  async sendSimpleMailsTemplate(req: Request, res: Response) {
    const emailTemplate = fs.readFileSync(
      path.resolve("src/layouts/template1.hbs"),
      "utf-8"
    );

    const template = hbs.compile(emailTemplate);

    const html = template({
      companyName: "Extra Bom Supermercado",
    });

    var mailOptions = {
      from: "izaquedione@gmail.com",
      to: "izaquenunes560@gmail.com",
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

    console.log("4");
  }
}

export { MailsControllers };
