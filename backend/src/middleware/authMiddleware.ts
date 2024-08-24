import { Request,Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload ; 
    }
  }
}

export const verifyToken = (req: Request,res: Response,next: NextFunction) => {
  const token = req.header('Authorization');
  if(!token){
    res.status(401).json({
      error: 'Access Denied'
    })
  }
  try{
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded as JwtPayload;
    next();
  }
  catch(e){
    res.status(401).json({
      error: 'Invalid Token'
    })
  }
}