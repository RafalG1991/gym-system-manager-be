import * as jsonwebtoken from 'jsonwebtoken';
import { Strategy } from 'passport-jwt';
import * as passport from 'passport';
import { NextFunction, Request, Response } from 'express';
// import { UserRecord } from '../records/user.record';

export const issueJWT = () => {
  const payload = {
    sub: 'abc',
    iat: Date.now(),
  };
  const expiresIn = '15m';
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
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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

// export const strategy = new Strategy(options, (payload, done) => {
//   UserRecord.getOne(payload.sub)
//     .then((user) => {
//       if (user) return done(null, user.id);
//       return done(null, false);
//     })
//     .catch((err) => done(err, null));
// });

interface SubRequest extends Request {
  user: {
    sub: string,
    iat: number,
    exp: number
  }
}

export const verifyUser = passport.authenticate('jwt', { session: false });
export const isAdmin = async (req: SubRequest, res: Response, next: NextFunction) => {
  const user = { user: 'testowy', email: 'admin@admin.com' };
  if (user.email === 'admin@admin.com') {
    return next();
  }
  return res
    .status(403)
    .json({ err: 'Access denied' });
};
