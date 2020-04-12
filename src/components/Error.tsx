import React from 'react';

import errorStyles from '../styles/error.css';

const Error = ({ fetch }) => (
  <div>
    <div className={errorStyles.error}>
      &#128553; Uh oh. It looks like some things haven't loaded correctly
      <div data-testid="refetch" className={errorStyles.refetch} onClick={fetch}>
        Click here to try again.
      </div>
    </div>
  </div>
);

export default Error;
