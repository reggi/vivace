import express from 'express';
import Candidates from './candidates';

let router = express.Router();

router.use('/candidates', Candidates.router);

if (process.env.NODE_ENV !== 'production') {
  route.use('/dev', require('./devRoutes'));
}

module.exports = router;
