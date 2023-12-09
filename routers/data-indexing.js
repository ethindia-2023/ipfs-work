import { Router } from 'express';

import * as controller from '../controllers/data-indexing.js';

const router = Router();

router.post('/dataindexing', controller.postDataIndexing);
router.post('/cid', controller.addCID);
router.get('/cidgrouped', controller.getCIDByGroupTimeRange);
router.get('/cidatomic', controller.getCIDWithinAtomicTimeRange);
router.post('/page', controller.addPage);
router.get('/pagebytimerange', controller.get_page_by_time_range);
router.get('/findpagebygrouptimerange', controller.findPagesByGroupTimeRange);

export { router as dataIndexingRouter };