import * as jwt from 'jsonwebtoken';

export const generateJWT = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '60s' });
};
