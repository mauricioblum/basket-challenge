import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  addProducts: ['products'],
  removeProduct: ['removedProduct'],
});

export const BasketTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  products: [],
  error: null,
  loading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PRODUCTS]: (state, { products }) =>
    state.merge({
      products,
      loading: false,
    }),
  [Types.REMOVE_PRODUCT]: (state, { removedProduct }) =>
    state.merge({
      products: state.products.filter(
        product => product.sku !== removedProduct.sku
      ),
      loading: false,
    }),
});
