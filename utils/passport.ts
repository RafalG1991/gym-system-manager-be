import * as jsonwebtoken from 'jsonwebtoken';
import { Strategy } from 'passport-jwt';
import * as passport from 'passport';
import { Request } from 'express';
import { UserEntity } from '../types';

export const issueJWT = (user: UserEntity) => {
  const payload = {
    sub: user.id,
    iat: Date.now(),
  };
  const expiresIn = '5m';
  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_ACCESS, { expiresIn });
  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
};

const cookieExtractor = (req: Request) => {
  if (!req.cookies.authToken) {
    throw new Error('You are not logged in');
  }
  const token = req && req.cookies ? req.cookies.authToken : null;
  return token.split(' ')[1];
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_ACCESS,
  algorithm: ['HS256'],
};

export const strategy = new Strategy(options, async (token, done) => {
  try {
    console.log(token);
    if (!token) {
      throw new Error('You are not logged in');
    }
    return done(null, token);
  } catch (e) {
    return done(e);
  }
});

export const verifyUser = passport.authenticate('jwt', { session: false });
