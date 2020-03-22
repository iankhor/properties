import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import Container from 'components/Container';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
} else {
  const axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}

const rootElement = document.getElementById('react-app');

render(<Container />, rootElement);
