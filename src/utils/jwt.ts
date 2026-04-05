import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
