import React from 'react';
import layoutStyles from 'styles/layout.css';

const Layout = ({ children }) => <div className={layoutStyles.layout}>{children}</div>;

export default Layout;
