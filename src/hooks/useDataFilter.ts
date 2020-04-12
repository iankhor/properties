import React, { useState } from 'react';
import { isFound } from 'lib/utils';

type FilterData = {
  data: any;
  criteria?: any;
};

type DataFilterHook = {
  data: any;
  filterBy: (filter: FilterData) => void;
};

const useDataFilter = (): DataFilterHook => {
  const [data, setData] = useState([]);

  const filterBy = ({ data, criteria = {} }): void => {
    if (!criteria) {
      return setData(data);
    }

    const [key, value] = Object.entries(criteria).flatMap((data) => data);
    const filteredData = data.filter((data) => isFound(data, key, value));

    setData(filteredData);
  };

  return { data, filterBy };
};

export default useDataFilter;
