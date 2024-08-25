import { Request, Response, NextFunction } from "express";

const forceHttpsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.APP_ENV !== "development") {
    return next();
  }
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }

  next();
};

export default forceHttpsMiddleware;
