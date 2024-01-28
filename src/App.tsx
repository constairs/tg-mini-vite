import { useState, useContext, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import {
  useColorMode,
  useDisclosure,
  Grid,
  GridItem,
  Button,
  IconButton,
  Center,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Image,
  HStack,
  CloseButton,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, ChatIcon } from '@chakra-ui/icons';

import { AppContext } from './Context';
import errorImg from './assets/drive.gif';
import { Goods } from './types';
// import { GoodsCard } from './components/GoodsCard';
import { TiltCard } from './components/TiltCard';

import './App.css';
import { CartFloat } from './components/CartFloat';

function App() {
  const { cartItems } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const [goods, setGoods] = useState<Goods[]>([
    {
      id: 1,
      price: '120',
      name: 'name',
      desctiption: 'kekw',
      img: 'https://images.unsplash.com/photo-1557672199-6e8c8b2b8fff?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
      weight: 12,
    },
  ]);

  const cart = Object.values(cartItems);

  useEffect(() => {
    fetch('https://8012ef8b24365029.mokky.dev/goods')
      .then(async res => {
        const data = await res.json();

        console.log('data', data);

        if (res.ok) {
          return data;
        } else {
          throw new Error(data?.message || 'Неизвестная ошибка');
        }
      })
      .then(res => {
        setGoods(res);
      })
      .catch(e => {
        console.error(e);
        onOpen();
      });
  }, [onOpen]);

  return (
    <>
      <Heading
        textAlign="left"
        mb={4}>
        Заказ
      </Heading>
      <Grid
        templateColumns="1fr 1fr 1fr"
        gap={4}>
        {goods.map(item => (
          <GridItem
            key={item.id}
            w="100%">
            {/* <GoodsCard item={item} /> */}
          </GridItem>
        ))}
      </Grid>
      <TiltCard />
      <Center p={4}>
        <Button
          onClick={() =>
            WebApp.showAlert(`Так пиздуй приготовь хавку, че расселся?`)
          }>
          Жестко хочу жрать!
        </Button>
      </Center>

      <Center p={4}>
        <HStack>
          <IconButton
            isRound={true}
            variant="solid"
            colorScheme="teal"
            aria-label="Add"
            fontSize="1rem"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />

          <IconButton
            isRound={true}
            variant="solid"
            colorScheme="teal"
            aria-label="Add"
            fontSize="1rem"
            icon={<ChatIcon />}
            onClick={onOpen}
          />
        </HStack>
      </Center>
      <Modal
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={4}>
          <Flex>
            <Spacer />
            <CloseButton onClick={onClose} />
          </Flex>
          <Heading
            as="h3"
            size="md"
            color="tomato"
            mb={4}>
            Произошла ошибка
          </Heading>
          <Image
            src={errorImg}
            borderRadius={4}
            alt="Ошибка"
          />
        </ModalContent>
      </Modal>
      {!!cart.length && <CartFloat />}
    </>
  );
}

export default App;
