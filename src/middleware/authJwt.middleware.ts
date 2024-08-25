import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ERROR } from "../constants/auth.constants";

// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers["authorization"];
  
//   // Verifica se o authHeader está presente e se segue o formato 'Bearer token'
//   const token = authHeader && authHeader.split(" ")[1];
//   console.log('TOKEN:', token);

//   if (!token) {
//     return res.status(401).json({ msg: ERROR.ACCESS_DENIED });
//   }

//   // Verifica se o token tem três partes (header, payload, signature)
//   const parts = token.split('.');
//   if (parts.length !== 3) {
//     return res.status(400).json({ msg: ERROR.TOKEN_INVALID });
//   }

//   try {
//     const secret = process.env.SECRET as string;
//     const decoded = jwt.verify(token, secret);
//     next();
//   } catch (err) {
//     console.error('Token verification error:', err);
//     res.status(400).json({ msg: ERROR.TOKEN_INVALID });
//   }
// };

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.SECRET_FIREBASE as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    req.body.userId = (decoded as any).userId;
    next();
  });
};

export default verifyToken;
