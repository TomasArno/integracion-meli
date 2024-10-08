import { NextFunction, Request, Response } from "express";

function checkPass(req: Request, res: Response, next: NextFunction) {
  if (req.query.pass != process.env.ADMIN_PASS) {
    res.status(401).json({ message: "Invalid admin password" });
    return;
  }
  next();
}

export { checkPass };
