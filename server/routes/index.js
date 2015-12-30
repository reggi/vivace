import express from 'express';
import Candidates from './candidates';
import Comments from './comments';

let router = express.Router();

router.use('/candidates/:candidateId/comments', Comments.router);
router.use('/candidates', Candidates.router);

module.exports = router;
