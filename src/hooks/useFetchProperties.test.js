import { testHook, mockAxiosGet } from 'testlib/test-utils';
import { act } from 'react-dom/test-utils';

import useFetchProperties from 'hooks/useFetchProperties';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} }))
}));

describe('useFetchProperties', () => {
  let hooksOpts;
  const mockUrl = '/theUrl';
  process.env.REACT_APP_PROPERTIES_ENDPOINT = mockUrl;

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
          mockAxiosGet({
            mockAxios: axios,
            mockUrl,
            successResponse: {
              status: 200,
              data: [{ foo: 'bar' }]
            }
          });

          testHook(() => {
            hooksOpts = useFetchProperties();
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

      describe('refetching from a failed state', () => {
        it('has isError as false', async () => {
          mockAxiosGet({
            mockAxios: axios,
            mockUrl,
            failResponse: { status: 422 }
          });

          testHook(() => {
            hooksOpts = useFetchProperties();
          });

          const [_, fetch] = hooksOpts;
          await act(() => fetch());

          const [failedState] = hooksOpts;
          expect(failedState.isComplete).toEqual(true);
          expect(failedState.isError).toEqual(true);

          mockAxiosGet({
            mockAxios: axios,
            mockUrl,
            successResponse: {
              status: 200,
              data: [{ foo: 'bar' }]
            }
          });

          await act(() => fetch());
          const [succeededState] = hooksOpts;

          expect(succeededState.isComplete).toEqual(true);
          expect(succeededState.isError).toEqual(false);
          expect(succeededState.isSuccess).toEqual(true);
        });
      });

      describe('failed', () => {
        beforeEach(async () => {
          mockAxiosGet({
            mockAxios: axios,
            mockUrl,
            failResponse: { status: 422 }
          });

          testHook(() => {
            hooksOpts = useFetchProperties();
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
