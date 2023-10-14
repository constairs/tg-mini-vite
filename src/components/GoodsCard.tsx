import React from 'react';
import { Card, CardHeader, CardBody, Image, IconButton, HStack, useNumberInput } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

import { Goods } from '../types';

interface GoodsCardProps {
    item: Goods;
}

export const GoodsCard: React.FC<GoodsCardProps> = ({
    item
}) => {
    const { value: itemsValue, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 10,
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();

  return (
    <Card>
      <CardHeader>
      <HStack justify='center' maxW='320px'>
          <IconButton
              isRound={true}
              variant='solid'
              colorScheme='teal'
              aria-label='Add'
              fontSize='1rem'
              icon={<MinusIcon />}
              {...dec}
          />
          <div>{itemsValue}</div>
          <IconButton
              isRound={true}
              variant='solid'
              colorScheme='teal'
              aria-label='Add'
              fontSize='1rem'
              icon={<AddIcon />}
              {...inc}
          />
        </HStack>
      </CardHeader>
      <CardBody p={4} pt={0}>
        <Image src={item.img} alt={item.name} />
      </CardBody>
    </Card>
  );
};