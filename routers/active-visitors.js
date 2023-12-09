import { Router } from 'express';

import * as controller from '../controllers/active-visitors.js';

const router = Router();

router.post('/active-visitors', controller.postActiveVisitors);
router.post('/public-key', controller.addPublicKey);
router.get('/active-visitors-over-time', controller.getActiveVisitorsOverTimeRange);
router.get('/active-visitors-grouped', controller.getActiveVisitorsGroupedByTimeRange);
router.get('/active-page-views-over-time', controller.getActivePageViewsOverTimeRange);

export { router as activeVisitorsRouter };