import express from 'express';
import cors from 'cors';
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// apis

app.get('/', (req, res) => {
  res.json('app is running');
});

export default app;
