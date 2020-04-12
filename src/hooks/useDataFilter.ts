import React, { useState } from 'react';
import { isFound } from '../lib/utils';

type DataFilterHook = {
  data: any;
  filterBy: () => {};
};

const useDataFilter = () => {
  const [data, setData] = useState([]);

  const filterBy = ({ data, criteria }) => {
    if (!criteria) {
      return setData(data);
    }

    const [key, value] = Object.entries(criteria).flatMap((data) => data);
    const filteredData = data.filter((data) => isFound(data, key, value));

    setData(filteredData);
  };

  return [data, filterBy];
};

export default useDataFilter;
