import express from 'express';
import db from '../helper/database';

var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('hello');   

  next();
});

module.exports = router;
