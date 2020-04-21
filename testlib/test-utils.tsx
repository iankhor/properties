/* istanbul ignore file */

import React from 'react';
import { render } from '@testing-library/react';

const TestHook = ({ callback }) => {
  callback();
  return null;
};

export const testHook = (callback, testSetup = () => {}) => {
  testSetup();
  render(<TestHook callback={callback} />);
};

export const mockAxiosGet = ({ mockAxios, mockUrl, successResponse = {}, failResponse = {} }) => {
  mockAxios.get.mockImplementationOnce(url => {
    if (url === mockUrl) {
      return Object.keys(successResponse).length ? Promise.resolve(successResponse) : Promise.reject(failResponse);
    } else {
      return Promise.reject({ status: 400 });
    }
  });
};
