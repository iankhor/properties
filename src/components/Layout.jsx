import React from 'react';
import containerStyles from 'styles/container.css';

const Layout = ({ children }) => <div className={containerStyles.container}>{children}</div>;

export default Layout;
