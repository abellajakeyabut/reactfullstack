import React from 'react';
import propTypes from 'prop-types';
/* non-component approach

const Contest = ({ categoryName, contestName }) => (
  <div className="Contest">
    <div className="category-name">{categoryName}</div>
    <div className="contest-name">{contestName}</div>
  </div>
);
*/

class Contest extends React.Component {
  render() {
    return (
      <div className="Contest">
        <div className="category-name">{this.props.categoryName}</div>
        <div className="contest-name"> {this.props.contestName}</div>
      </div>
    );
  }
}

Contest.propTypes = {
  id: propTypes.number,
  categoryName: propTypes.string.isRequired,
  contestName: propTypes.string.isRequired,
};
export default Contest;
