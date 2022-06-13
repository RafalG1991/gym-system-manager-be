import * as express from 'express';
import * as cors from 'cors';
import 'express-async-errors';
import * as cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
// import * as passport from 'passport';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
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

app.listen(3000, 'localhost', () => {
  console.log('Server is running on http://localhost:3000');
});
