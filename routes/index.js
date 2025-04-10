import express from 'express';
import apiRoutes from './api/index.js';

console.log('base routes loaded');

const router = express.Router();

router.use(apiRoutes);
router.use((req, res) => res.status(404).send('404 - Not Found'));

export default router;
