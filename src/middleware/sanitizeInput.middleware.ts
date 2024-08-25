import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';

const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  const sanitize = (input: any) => {
    if (typeof input === 'string') {
      return sanitizeHtml(input);
    } else if (typeof input === 'object' && input !== null) {
      for (const key in input) {
        if (input.hasOwnProperty(key)) {
          input[key] = sanitize(input[key]);
        }
      }
    }
    return input;
  };

  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);

  next();
};

export default sanitizeInput;