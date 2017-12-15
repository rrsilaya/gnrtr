import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully connected to API'
  });
});

export default router;