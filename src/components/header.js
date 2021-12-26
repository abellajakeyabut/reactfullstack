import React from 'react';
import propTypes from 'prop-types';

const color = Math.random() > 0.5 ? 'green' : 'red';
const Header = (props) => {
  console.log(`header name is ${props.headerMessage}`);
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
