import express from 'express';
import conn from '../models/_connection';
import '../CandidateModel';

var router = express.Router();

router.get('sync/', function(req, res) {
  conn.sync().then(function() {
    res.end('database created');
  }, function(err) {
    console.error(err);
    res.end('error creating db. see console');
  });
});

module.exports = router;