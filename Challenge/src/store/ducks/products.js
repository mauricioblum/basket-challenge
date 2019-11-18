import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getProducts: ['data'],
});

export const ProductsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  error: null,
  loading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PRODUCTS]: (state, { data }) =>
    state.merge({
      data,
      loading: false,
    }),
});
