import React from 'react';
import { render } from 'react-dom';
import Container from 'components/Container';

const rootElement = document.getElementById('react-app');

const url = 'https://code-challenge.activepipe.com/challenge/properties';

render(<Container url={url} />, rootElement);
