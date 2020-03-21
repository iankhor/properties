import React, { Fragment } from 'react';

const Error = ({ fetch }) => (
  <Fragment>
    <div>Uh oh. It looks like some things haven't loaded correctly</div>
    <div data-testid="refetch" onClick={fetch}></div>
  </Fragment>
);

export default Error;
