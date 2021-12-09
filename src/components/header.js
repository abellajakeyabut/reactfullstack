import ReactDOM from 'react-dom';
import React from 'react';
import propTypes from 'prop-types';

const color = Math.random() > 0.5 ? 'green' : 'red';
const Header = (props) => {
  return (
    <h2 className="Header text-center" style={{ color }}>
      {props.headerMessage}
    </h2>
  );
};
export default Header;
Header.propTypes = {
  headerMessage: propTypes.string,
};
/* In case you want to set default props
  Header.defaultProps = {
    headerMessage: 'Default header Message',
  };*/
