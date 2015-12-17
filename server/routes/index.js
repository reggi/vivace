import express from 'express';
import Candidates from './candidates';

var router = express.Router();

router.use('/candidates', Candidates.router);

module.exports = router;
