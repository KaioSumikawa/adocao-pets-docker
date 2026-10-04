import { Router } from 'express';

import { petRoutes } from './petRoutes';

const router = Router();

router.use('/pets', petRoutes);

export { router as appRoutes };
