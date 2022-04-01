import { Request, Response } from "express";
import { InternalError } from "../../config/generateError";
import transporter from "../../config/smtp";

class TestConnectionController {
  async test(req: Request, res: Response) {
    transporter.verify((error, success) => {
      if (success) {
        return res.status(200).json({ message: "smpt service connected!" });
      } else {
        throw new InternalError("smpt service not connected!", 400);
      }
    });
  }
}

export { TestConnectionController };
