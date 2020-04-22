import React, { useState } from 'react';
import { isFound } from 'lib/utils';

export type Data = {
  id: number;
  status: string;
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  price: number;
  image: string;
};

type Criteria = {
  status: string;
};

type FilterData = {
  data: Data[];
  criteria?: Criteria | any; //TODO: refactor;
};

type DataFilterHook = {
  data: Data[];
  filterBy: (filter: FilterData) => void;
};

const useDataFilter = (): DataFilterHook => {
  const [data, setData] = useState([]);

  //TODO: refactor;
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
