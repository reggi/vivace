import express from 'express';
import Candidates from './candidates';

let router = express.Router();

router.use('/candidates', Candidates.router);

export default router;
