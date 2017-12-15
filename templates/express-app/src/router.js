import { Router } from 'express';

import entityRouter from './entities/entity/entity.router';

const router = Router();

router.use(entityRouter);

export default router;