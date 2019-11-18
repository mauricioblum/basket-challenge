import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validateCard from '../../utils/validateCard';
import {
  Container,
  Title,
  Menu,
  MenuOption,
  BasketButton,
  ContinueShoppingButton,
  BasketQty,
  Content,
  ProductContainer,
  Product,
  ProductName,
  Price,
  RemoveButton,
  FooterMenu,
  CheckoutButton,
  InputContainer,
  Text,
  Value,
  Input,
  ApplyButton,
  DetailsContainer,
  Detail,
} from './styles';
import { BasketTypes } from '../../store/ducks/basket';
import api from '../../services/api';

export default function BasketCheckout({ history }) {
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [card, setCard] = useState('');
  const dispatch = useDispatch();
  const basket = useSelector(state => state.basket.products);

  const basketQuantity = useMemo(() => {
    if (basket.length) {
      return basket.map(product => product.quantity).reduce((a, b) => a + b);
    }
    return 0;
  }, [basket]);

  const subtotal = useMemo(() => {
    if (basket.length) {
      return basket
        .map(product => product.quantity * product.price)
        .reduce((a, b) => a + b);
    }
    return 0;
  }, [basket]);

  const promotionalDiscount = useMemo(() => {
    const localPromo = localStorage.getItem('promoCode');
    if (localPromo) {
      return (localPromo / 100) * subtotal;
    }
    return (discount / 100) * subtotal;
  }, [discount]);

  const basketTotal = useMemo(() => {
    return subtotal - promotionalDiscount;
  }, [discount]);

  function removeProduct(product) {
    dispatch({ type: BasketTypes.REMOVE_PRODUCT, removedProduct: product });
  }

  async function applyPromocode() {
    console.log(promo);
    try {
      const response = await api.post('/promocode', {
        promoCode: promo,
      });
      console.log(response.data.amount / 100);
      setDiscount(response.data.amount);
      localStorage.setItem('promoCode', response.data.amount);
    } catch (err) {
      console.log(err);
      alert('Invalid promotional code!');
    }
  }

  async function confirmCheckout() {
    if (card !== '' && validateCard(card)) {
      try {
        const basketProducts = basket.map(product => ({
          sku: product.sku,
          quantity: product.quantity,
        }));
        const response = await api.post('/checkout', {
          basket: basketProducts,
          cardNumber: card,
        });
        console.log(response.data);
        localStorage.setItem('checkoutMsg', response.data.msg);
        history.push('/confirm');
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Please enter a valid credit card!');
    }
  }

  return (
    <Container>
      <Title>Basket / Checkout</Title>
      <Menu>
        <ContinueShoppingButton onClick={() => history.push('/')}>
          Continue Shopping
        </ContinueShoppingButton>
        <MenuOption>
          <BasketButton>Basket</BasketButton>
          <BasketQty>{basketQuantity}</BasketQty>
        </MenuOption>
      </Menu>
      <Content>
        <ProductContainer>
          {basket.map(product => (
            <Product key={product.sku}>
              <ProductName>{product.name}</ProductName>
              <BasketQty>{product.quantity}</BasketQty>
              <Price>
                {parseFloat(product.price * product.quantity).toFixed(2)}
              </Price>
              <RemoveButton onClick={() => removeProduct(product)}>
                Remove
              </RemoveButton>
            </Product>
          ))}
        </ProductContainer>
        <InputContainer>
          <Text>Enter Promo Code</Text>
          <Input value={promo} onChange={e => setPromo(e.target.value)} />
          <ApplyButton onClick={() => applyPromocode()}>Apply</ApplyButton>
        </InputContainer>
        <DetailsContainer>
          <Detail>
            <Text>SubTotal</Text>
            <Value>{parseFloat(subtotal).toFixed(2)}</Value>
          </Detail>
          <Detail>
            <Text>Promotional discount amount</Text>
            <Value>{parseFloat(promotionalDiscount).toFixed(2)}</Value>
          </Detail>
          <Detail>
            <Text>Basket Total</Text>
            <Value>{parseFloat(basketTotal).toFixed(2)}</Value>
          </Detail>
        </DetailsContainer>
        <InputContainer>
          <Text>Please enter your credit card number</Text>
          <Input value={card} onChange={e => setCard(e.target.value)} />
        </InputContainer>
      </Content>
      <FooterMenu>
        <CheckoutButton onClick={() => confirmCheckout()}>
          Checkout
        </CheckoutButton>
      </FooterMenu>
    </Container>
  );
}
