import React from 'react';
import propTypes from 'prop-types';

class ContestPreview extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    console.log(this.props.contestName);
    this.props.onClick(this.props.id);
  };
  render() {
    console.log('rendering preview');
    return (
      <div className="link ContestPreview" onClick={this.handleClick}>
        <div className="category-name">{this.props.categoryName}</div>
        <div className="contest-name">{this.props.contestName}</div>
      </div>
    );
  }
}
ContestPreview.propTypes = {
  categoryName: propTypes.string,
  contestName: propTypes.string,
  onClick: propTypes.func.isRequired,
  id: propTypes.number,
};
export default ContestPreview;
