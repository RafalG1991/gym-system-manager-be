import { Router } from 'express';
import { UserRecord } from '../records/user.record';
import { issueJWT, verifyUser } from '../utils/passport';
import { checkPassword } from '../utils/bcrypt';

export const userRouter = Router();

userRouter
  .post('/signup', async (req, res) => {
    const user = await UserRecord.getOneByEmail(req.body.email);
    if (user) return res.status(200).json({ err: 'Email already in use' });
    const newUser: UserRecord = new UserRecord(req.body);
    const id = await newUser.addOne();
    const { token, expires } = issueJWT(newUser);
    return res
      .status(200)
      .cookie('authToken', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 15),
      })
      .json({ sub: id, expires });
  })
  .post('/login', async (req, res) => {
    if (!req.body.email || !req.body.password) return res.status(401).json({ err: 'Invalid data' });
    const user = await UserRecord.getOneByEmail(req.body.email);
    if (!user) return res.status(401).json({ err: 'Invalid data' });
    const isValid = await checkPassword(req.body.password, user.password);
    if (isValid) {
      const { token, expires } = issueJWT(user);
      return res
        .status(200)
        .cookie('authToken', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        .json({ sub: user.id, expires });
    }
    return res.status(401).json({ err: 'Invalid data' });
  })
  .get('/me', verifyUser, (req, res) => {
    res
      .json(req.user);
  });
