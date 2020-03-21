import React, { Fragment } from 'react';

import errorStyles from 'styles/error.css';

const Error = ({ fetch }) => (
  <div>
    <div className={errorStyles.error}>
      Uh oh. It looks like some things haven't loaded correctly
      <div data-testid="refetch" className={errorStyles.refetch} onClick={fetch}>
        X
      </div>
    </div>
  </div>
);

export default Error;
