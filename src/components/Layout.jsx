import React from 'react';
import layoutStyles from 'styles/layout.css';

const Layout = ({ children }) => <div className={layoutStyles.container}>{children}</div>;

export default Layout;
