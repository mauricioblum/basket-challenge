import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
`;

export const Title = styled.h1`
  font-weight: bold;
  text-align: left;
  color: black;
  padding: 20px;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 20px;
  background-color: white;
`;

export const MenuOption = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BasketButton = styled.button.attrs({
  type: 'button',
})`
  border: 0;
  background-color: #7519ac;
  color: white;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  width: 100px;
  &:hover {
    background-color: #8419ac;
  }
`;

export const BasketQty = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
  border: 1px solid black;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 25px;
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  border: 1px solid black;
  padding: 20px;
`;

export const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
`;

export const ProductName = styled.h3`
  color: black;
  font-weight: bold;
`;

export const Price = styled.h3`
  color: black;
  font-weight: bold;
`;

export const AddToBasketButton = styled.button.attrs({
  type: 'button',
})`
  border: 2px solid black;
  background-color: #3519ac;
  color: white;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  width: 100px;
  height: 60px;
  &:hover {
    background-color: #0119cc;
  }
`;

export const FooterMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 20px;
  background-color: white;
`;

export const CheckoutButton = styled.button.attrs({
  type: 'button',
})`
  border: 2px solid black;
  background-color: #7519ac;
  color: white;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  padding: 20px;
  &:hover {
    background-color: #8419ac;
  }
`;
