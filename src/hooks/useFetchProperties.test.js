import { testHook, mockAxiosGet } from 'testlib/test-utils';
import { airportDetails } from 'testlib/fixtures';
import { act } from 'react-dom/test-utils';

import useFetchProperties from 'hooks/useFetchProperties';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} }))
}));

describe('useFetchProperties', () => {
  let hooksOpts;

  beforeEach(() => jest.clearAllMocks());

  describe('initial states', () => {
    beforeEach(() => {
      testHook(() => {
        hooksOpts = useFetchProperties();
      });
    });

    it('is all false', () => {
      const [{ isLoading, isComplete, isSuccess, isError }] = hooksOpts;

      expect(isLoading).toEqual(false);
      expect(isComplete).toEqual(false);
      expect(isSuccess).toEqual(false);
      expect(isError).toEqual(false);
    });
  });

  describe('fetch properties', () => {
    describe('while fetching', () => {
      beforeEach(async () => {
        testHook(() => {
          hooksOpts = useFetchProperties();
        });

        const [_, fetch] = hooksOpts;
        await act(() => fetch());
      });

      it('isLoading is true', () => {
        const [{ isLoading }] = hooksOpts;

        expect(isLoading).toEqual(true);
      });

      it('other states are false', () => {
        const [{ isComplete, isSuccess, isError }] = hooksOpts;

        expect(isComplete).toEqual(false);
        expect(isSuccess).toEqual(false);
        expect(isError).toEqual(false);
      });
    });

    describe('fetch has completed', () => {
      describe('successful', () => {
        beforeEach(async () => {
          const url = 'api.qantas.com/airports';
          mockAxiosGet({
            mockAxios: axios,
            mockUrl: url,
            successResponse: {
              status: 200,
              data: [{ foo: 'bar' }]
            }
          });

          testHook(() => {
            hooksOpts = useFetchProperties({ url });
          });

          const [_, fetch] = hooksOpts;
          await act(() => fetch());
        });

        it('isSuccess is true', () => {
          const [{ isSuccess }] = hooksOpts;

          expect(isSuccess).toEqual(true);
        });

        it('isComplete is true', () => {
          const [{ isComplete }] = hooksOpts;

          expect(isComplete).toEqual(true);
        });

        it('other states are false', () => {
          const [{ isLoading, isError }] = hooksOpts;

          expect(isLoading).toEqual(false);
          expect(isError).toEqual(false);
        });

        it('it sets data to the fetched data', () => {
          const [{ data }] = hooksOpts;

          expect(data).toEqual([{ foo: 'bar' }]);
        });
      });

      describe('failed', () => {
        beforeEach(async () => {
          const url = 'api.qantas.com/airports';
          mockAxiosGet({
            mockAxios: axios,
            mockUrl: url,
            failResponse: { status: 422 }
          });

          testHook(() => {
            hooksOpts = useFetchProperties({ url });
          });

          const [_, fetch] = hooksOpts;
          await act(() => fetch());
        });

        it('isError is true', () => {
          const [{ isError }] = hooksOpts;

          expect(isError).toEqual(true);
        });

        it('isComplete is true', () => {
          const [{ isComplete }] = hooksOpts;

          expect(isComplete).toEqual(true);
        });

        it('other states are false', () => {
          const [{ isLoading, isSuccess }] = hooksOpts;

          expect(isLoading).toEqual(false);
          expect(isSuccess).toEqual(false);
        });
      });
    });
  });
});
