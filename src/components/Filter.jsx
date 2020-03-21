import React from 'react';

const Filter = ({ filterBy, data }) => {
  const filter = ({ target: { value } }) => {
    // TODO: ugly. to refactor
    const criteria = !!value ? { status: value } : null;

    filterBy({ data, criteria });
  };
  return (
    <select data-testid="filter" onChange={filter}>
      <option value="">All</option>
      <option value="sold">Sold</option>
      <option value="current">Current</option>
    </select>
  );
};

export default Filter;
