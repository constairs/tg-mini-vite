import React from 'react';
import {
  Card,
  CardBody,
  Image,
  IconButton,
  HStack,
  useNumberInput,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

import { Goods } from '../types';

interface GoodsCardProps {
  item: Goods;
}

export const GoodsCard: React.FC<GoodsCardProps> = ({ item }) => {
  const {
    value: itemsValue,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 0,
    min: 0,
    max: 10,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();

  return (
    <Card>
      <CardBody
        p={1}
        pt={2}>
        <Image
          src={item.img}
          alt={item.name}
        />
      </CardBody>
      <HStack
        justify="flex-end"
        maxW="320px">
        {+itemsValue && (
          <>
            <IconButton
              isRound={true}
              variant="solid"
              colorScheme="teal"
              aria-label="Add"
              fontSize="1rem"
              icon={<MinusIcon />}
              {...dec}
            />
            <div>{itemsValue}</div>
          </>
        )}
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          aria-label="Add"
          fontSize="1rem"
          icon={<AddIcon />}
          {...inc}
        />
      </HStack>
    </Card>
  );
};
