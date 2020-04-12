import { testHook, mockAxiosGet } from 'testlib/test-utils';
import useDataFilter from 'hooks/useDataFilter';
import { act } from 'react-dom/test-utils';

describe('useDataFilter', () => {
  let hooksOpts;

  beforeEach(() => {
    testHook(() => {
      hooksOpts = useDataFilter();
    });
  });

  test.each`
    data                            | criteria            | filteredData
    ${[{ a: 'foo' }, { a: 'bar' }]} | ${null}             | ${[{ a: 'foo' }, { a: 'bar' }]}
    ${[{ a: 'foo' }, { a: 'bar' }]} | ${undefined}        | ${[]}
    ${[{ a: 'foo' }, { a: 'bar' }]} | ${{}}               | ${[]}
    ${[{ a: 'foo' }, { a: 'bar' }]} | ${{ a: null }}      | ${[]}
    ${[{ a: 'foo' }, { a: 'bar' }]} | ${{ a: undefined }} | ${[]}
    ${[{ a: 'foo' }, { a: 'bar' }]} | ${{ b: 'foo' }}     | ${[]}
    ${[{ a: 'foo' }, { a: 'bar' }]} | ${{ a: 'foo' }}     | ${[{ a: 'foo' }]}
    ${[{ a: 'foo' }, { a: 'bar' }]} | ${{ a: 'bar' }}     | ${[{ a: 'bar' }]}
  `('returns $filteredData when search criteria is $criteria', ({ data, criteria, filteredData }) => {
    const { filterBy } = hooksOpts;
    act(() => filterBy({ data, criteria }));

    const { data: filteredProperties } = hooksOpts;
    expect(filteredProperties).toEqual(filteredData);
  });
});
