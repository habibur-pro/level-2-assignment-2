import express, { Request, Response } from 'express';
import cors from 'cors';
import { studentRoute } from './app/modules/user/user.route';
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// apis
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'welcome to assignment-2',
  });
});
app.use('/api/users', studentRoute);

export default app;
