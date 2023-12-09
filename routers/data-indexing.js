import { Router } from 'express';

import * as controller from '../controllers/data-indexing.js';

const router = Router();

router.post('/data-indexing', controller.postDataIndexing);
router.post('/cid', controller.addCID);
router.get('/cid-grouped', controller.getCIDByGroupTimeRange);
router.get('/cid-atomic', controller.getCIDWithinAtomicTimeRange);
router.post('/page', controller.addPage);
router.get('/page-by-time-range', controller.getPageByTimeRange);
router.get('/find-page-by-group-time-range', controller.findPagesByGroupTimeRange);

export { router as dataIndexingRouter };