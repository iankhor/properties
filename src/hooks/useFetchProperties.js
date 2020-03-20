import React, { useReducer } from 'react';
import axios from 'axios';

const SUCCESS = Symbol('success');
const FAIL = Symbol('fail');
const LOADING = Symbol('loading');

const initialState = { isLoading: false, isSuccess: false, isComplete: false, isError: false, data: [] };

const reducer = (state, { type, data }) => {
  switch (type) {
    case SUCCESS:
      return { ...state, isLoading: false, isSuccess: true, isComplete: true, data };
    case FAIL:
      return { ...state, isLoading: false, isError: true, isComplete: true };
    case LOADING:
      return { ...state, isLoading: true };
    default:
      throw new Error();
  }
};

const useFetchProperties = ({ url = '' } = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetch = async () => {
    dispatch({ type: LOADING });

    try {
      const { status, data } = await axios.get(url);

      status >= 200 && status < 300 && dispatch({ type: SUCCESS, data });
    } catch (e) {
      dispatch({ type: FAIL });
    }
  };

  return [state, fetch];
};

export default useFetchProperties;
