import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log('Mounting /api routes...');
app.use('/api', routes);

app.get('/test', (req, res) => {
  res.send('Express is working');
});

app.get('/', (req, res) => {
  res.send('Root route works!');
});


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
