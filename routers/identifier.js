import { Router } from 'express';

import * as controller from '../controllers/identifier.js';

const router = Router();

router.get('/identifier', controller.getIdentifier);
router.post('/identifier', controller.postIdentifier);
router.post('/log', controller.postLog);
router.get('/logatomic', controller.getLogsWithinAtomicTimeRange);
router.get('/loggrouped', controller.getLogsByGroupTimeRange);

export { router as identifierRouter };