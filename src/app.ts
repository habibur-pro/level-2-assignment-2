import express from 'express';
import cors from 'cors';
import { studentRoute } from './app/modules/user/user.route';
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// apis

app.use('/api/users', studentRoute);

export default app;
