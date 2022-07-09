import * as express from 'express';
import * as cors from 'cors';
import 'express-async-errors';
import * as cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import * as passport from 'passport';
import { strategy } from './utils/passport';
import { handleError } from './utils/errors';
import { userRouter } from './routes/user';
import { classRouter } from './routes/class';

passport.use(strategy);

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
}));

app.get('/', (req, res) => {
  res.json({ message: 'Test' });
});

app.use('/user', userRouter);
app.use('/class', classRouter);

app.use(handleError);

app.listen(3001, 'localhost', () => {
  console.log('Server is running on http://localhost:3001');
});
