import { Router } from 'express';

import * as controller from '../controllers/activevisitors.js';

const router = Router();

router.post('/activevisitors', controller.postActiveVisitors);
router.post('/publickey', controller.addPublicKey);
router.get('/activevisitorsovertime', controller.getActiveVisitorsOverTimeRange);
router.get('/activevisitorsgrouped', controller.getActiveVisitorsGroupedByTimeRange);
router.get('/activepageviewsovertime', controller.getActivePageViewsOverTimeRange);

export { router as activeVisitorsRouter };