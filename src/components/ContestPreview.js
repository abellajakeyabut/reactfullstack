import React from 'react';

const ContestPreview = (contest) => (
  <div className="classPreview">
    <div>{contest.categoryName}</div>
    <div>{contest.contestName}</div>
  </div>
);
export default ContestPreview;
