import React from 'react';
import ContestPreview from './contestPreview';
import propTypes from 'prop-types';

const ContestList = ({ contests, onContestClick }) => (
  <div className="ContestList">
    {Object.keys(contests).map((contestId) => (
      <ContestPreview
        {...contests[contestId]}
        key={contestId}
        onClick={onContestClick}
      ></ContestPreview>
    ))}
  </div>
);
ContestList.propTypes = {
  contests: propTypes.object,
  onContestClick: propTypes.func.isRequired,
};
export default ContestList;
