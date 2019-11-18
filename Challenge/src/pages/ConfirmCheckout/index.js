import React from 'react';

import { Container, Message } from './styles';

export default function ConfirmCheckout() {
  const message = localStorage.getItem('checkoutMsg');

  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
}

ConfirmCheckout.defaultProps = {
  status: 'ERROR',
};
