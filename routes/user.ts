import { Router } from 'express';
import { UserRecord } from '../records/user.record';
import { issueJWT, verifyUser } from '../utils/passport';
import { checkPassword } from '../utils/bcrypt';
import { UserAuthRequest, UserDataResponse } from '../types';

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
          expires: new Date(Date.now() + 1000 * 60 * 5),
        })
        .json({ sub: user.id, expires });
    }
    return res.status(401).json({ err: 'Invalid data' });
  })
  .get('/me', verifyUser, (req: UserAuthRequest, res) => {
    res
      .json(req.user);
  })
  .get('/data', verifyUser, async (req: UserAuthRequest, res) => {
    const user = await UserRecord.getOneById(req.user.sub);
    res.json({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      height: user.height,
      weight: user.weight,
      memberSince: user.memberSince,
      membershipDate: user.membershipDate,
    } as UserDataResponse);
  })
  .patch('/', verifyUser, async (req: UserAuthRequest, res) => {
    const user = await UserRecord.getOneById(req.user.sub);
    if (req.body.lastname && req.body.firstname) {
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      const id = await user.updateName();
      return res
        .status(200)
        .json({ id });
    }
    if (req.body.password) {
      user.password = req.body.password;
      const id = await user.changePassword();
      return res
        .status(200)
        .json({ id });
    }
    if (req.body.height && req.body.weight) {
      user.height = req.body.height;
      user.weight = req.body.weight;
      const id = await user.updateBmiData();
      return res
        .status(200)
        .json({ id });
    }
    return res
      .status(401)
      .json({ err: 'Invalid data' });
  })
  .patch('/membership', verifyUser, async (req: UserAuthRequest, res) => {
    try {
      const user = await UserRecord.getOneById(req.user.sub);
      const id = await user.extendMembership(req.body.months);
      return res
        .status(200)
        .json({ id });
    } catch (e) {
      console.log(e);
      return res
        .status(401)
        .json({ err: 'Invalid data' });
    }
  });
