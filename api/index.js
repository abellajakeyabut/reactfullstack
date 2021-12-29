import express from 'express';
const router = express.Router();
import data from '../src/testdata.json';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import { configuration } from '../serverConfig';

let mdb;
MongoClient.connect(configuration.mongodUri, (err, db) => {
  assert.equal(null, err);
  mdb = db;
});

const contests = data.contests.reduce((obj, contest) => {
  obj[contest.id] = contest;
  return obj;
}, {});

router.get('/contests', (req, res) => {
  let contests = {};
  mdb
    .collection('contests')
    .find({})
    .project({
      id: 1,
      categoryName: 1,
      contestName: 1,
      description: 1,
      nameIds:1
    })
    .each((err, contest) => {
      if (!contest) {
        res.send({ contests: contests });
        return;
      }
      contests[contest.id] = contest;
    });
});
router.get('/contest/:contestId', (req, res) => {
  mdb
    .collection('contests')
    .findOne(
      { id: Number(req.params.contestId) },
      {
        id: 1,
        categoryName: 1,
        contestName: 1,
        description: 1,
        nameIds: 1,
      }
    )
    .then((contest) => res.send(contest))
    .catch((error) => console.log(error));
});
router.get('/names/:nameIds', (req, res) => {
  const nameIds = req.params.nameIds.split(',').map(Number);
  let names = {};
  mdb
    .collection('names')
    .find({ id: { $in: nameIds } })
    .each((err, name) => {
      assert.equal(null, err);
      if (!name) {
        res.send({ names });
        return;
      }
      if (name) {
        names[name.id] = name;
      }
    });
});
export default router;
