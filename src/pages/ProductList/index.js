import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Title,
  Menu,
  MenuOption,
  BasketButton,
  BasketQty,
  Content,
  ProductContainer,
  Product,
  ProductName,
  Price,
  AddToBasketButton,
  FooterMenu,
  CheckoutButton,
} from './styles';
import { getProducts } from '../../services/productService';
import { BasketTypes } from '../../store/ducks/basket';

export default function ProductList({ history }) {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const basket = useSelector(state => state.basket.products);

  const basketQuantity = useMemo(() => {
    if (basket.length) {
      return basket.map(product => product.quantity).reduce((a, b) => a + b);
    }
    return 0;
  }, [basket]);

  async function fetchProducts() {
    try {
      const retrievedProducts = await getProducts();
      const productsWithQty = retrievedProducts.map(product => ({
        sku: product.sku,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: 1,
      }));
      setProducts(productsWithQty);
      console.log(productsWithQty);
    } catch (err) {
      console.log(err);
    }
  }

  function addProductToBasket(product) {
    const addedProducts = [...basket];
    // eslint-disable-next-line prefer-const
    let isDuplicate = addedProducts.find(p => p.sku === product.sku);
    if (!isDuplicate) {
      addedProducts.push(product);
      dispatch({ type: BasketTypes.ADD_PRODUCTS, products: addedProducts });
    } else {
      const indexOfProduct = addedProducts.indexOf(isDuplicate);

      const incrementedProduct = {
        ...isDuplicate,
        quantity: isDuplicate.quantity + 1,
      };
      if (incrementedProduct.quantity <= 10) {
        addedProducts[indexOfProduct] = incrementedProduct;
        dispatch({ type: BasketTypes.ADD_PRODUCTS, products: addedProducts });
      }
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Title>Product List</Title>
      <Menu>
        <MenuOption>
          <BasketButton onClick={() => history.push('/checkout')}>
            Basket
          </BasketButton>
          <BasketQty>{basketQuantity}</BasketQty>
        </MenuOption>
      </Menu>
      <Content>
        <ProductContainer>
          {products.map(product => (
            <Product key={product.sku}>
              <ProductName>{product.name}</ProductName>
              <Price>{product.price}</Price>
              <AddToBasketButton onClick={() => addProductToBasket(product)}>
                Add to Basket
              </AddToBasketButton>
            </Product>
          ))}
        </ProductContainer>
      </Content>
      <FooterMenu>
        <CheckoutButton onClick={() => history.push('/checkout')}>
          Proceed to Checkout
        </CheckoutButton>
      </FooterMenu>
    </Container>
  );
}
