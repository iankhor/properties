import React from 'react';
import { propertiesFixtures } from 'testlib/fixtures';
import { mockAxiosGet } from 'testlib/test-utils';
import { act } from 'react-dom/test-utils';
import { render, wait, within } from '@testing-library/react';

import Container from 'components/Container';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} }))
}));

describe('Container', () => {
  const mockUrl = 'api.ap.com/foobar';
  process.env.REACT_APP_PROPERTIES_ENDPOINT = mockUrl;

  describe('initial page view', () => {
    it('shows loading while fetching properties', () => {
      const { getByText } = render(<Container />);

      expect(getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('seeing a list of properties when when fetch is successful', () => {
    beforeEach(() => {
      mockAxiosGet({
        mockAxios: axios,
        mockUrl,
        successResponse: {
          status: 200,
          data: propertiesFixtures
        }
      });
    });

    it('sees a list of properties', async () => {
      const { getByTestId, getAllByTestId, queryByText } = render(<Container />);
      await act(() => wait());

      const listingOne = within(getByTestId('property-1'));
      expect(listingOne.queryByText('current')).toBeInTheDocument();
      expect(listingOne.getByAltText(/1 doom eternal doomguy 6666/i)).toHaveAttribute('src', 'http://random.com/1.jpg');
      expect(listingOne.queryByText('1 Doom')).toBeInTheDocument();
      expect(listingOne.queryByText('Eternal')).toBeInTheDocument();
      expect(listingOne.queryByText('Doomguy 6666')).toBeInTheDocument();
      expect(listingOne.queryByText('$1,500')).toBeInTheDocument();

      const listingTwo = within(getByTestId('property-2'));
      expect(listingTwo.queryByText('sold')).toBeInTheDocument();
      expect(listingTwo.getByAltText(/1 commander keen phobos 9999/i)).toHaveAttribute('src', 'http://random.com/2.jpg');
      expect(listingTwo.queryByText('1 Commander')).toBeInTheDocument();
      expect(listingTwo.queryByText('Keen')).toBeInTheDocument();
      expect(listingTwo.queryByText('Phobos 9999')).toBeInTheDocument();
      expect(listingTwo.queryByText('$100')).toBeInTheDocument();
    });

    describe('filtering', () => {
      it('sees a list of properties based on filter criteria', async () => {});
    });
  });

  describe('seeing a error message when fetch has failed', () => {
    beforeEach(() => {
      mockAxiosGet({
        mockAxios: axios,
        mockUrl,
        failResponse: {
          status: 500
        }
      });
    });

    it('shows an error message', async () => {});

    it('does not show the list', async () => {});
  });
});
