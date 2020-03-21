import React from 'react';
import { render } from 'react-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Container from 'components/Container';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const rootElement = document.getElementById('react-app');

render(<Container />, rootElement);
