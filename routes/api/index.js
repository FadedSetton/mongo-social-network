import express from 'express';
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';

console.log('api routes loaded');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;
