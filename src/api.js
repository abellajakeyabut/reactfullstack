import axios from 'axios';

export const fetchContest = (contestId) => {
  return axios.get(`/api/contest/${contestId}`).then((resp) => resp.data);
};

export const fetchAllcontest = () => {
  return axios.get('/api/contests').then((resp) => {
    console.log('results');
    console.log(resp.data);
    return resp.data;
  });
};
export const fetchNames = (nameIds) => {
  return axios.get(`/api/names/${nameIds.join(',')}`).then((resp) => resp.data);
};

export const addName = (newName, contestId) => {
  console.log(newName);
  console.log(contestId);
  return axios
    .post('/api/names/', { newName, contestId })
    .then((resp) => resp.data);
};
