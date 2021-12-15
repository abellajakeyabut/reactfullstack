import express from 'express';
const router = express.Router();
import data from '../src/testdata.json';

router.get('/', (req, res) => {
  res.send({ data: [] });
});
router.get('/contests', (req, res) => {
  setTimeout(() => {
    console.log('returning list');
    res.send({ contests: data.contests });
  }, 2000);
});
export default router;
