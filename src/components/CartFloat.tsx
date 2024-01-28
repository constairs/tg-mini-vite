import { useContext } from 'react';
import { Card, CardBody, Flex, Text, Button } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

import { AppContext } from '../Context';

export const CartFloat = () => {
  const { cartItems } = useContext(AppContext);
  const quantity = Object.values(cartItems).length;

  return (
    <Card colorScheme="cyan">
      <CardBody>
        <Flex
          align="center"
          justify="space-between">
          <WarningIcon />
          <Text>В корзине: {quantity} на сумму 100$</Text>
        </Flex>
        <Button size="sm">Заказать</Button>
      </CardBody>
    </Card>
  );
};
