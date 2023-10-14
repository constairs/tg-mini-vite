import { useState, useEffect } from 'react';
import { useColorMode, useDisclosure, Grid, GridItem, Button, IconButton, Center, Heading, Modal, ModalContent, ModalOverlay, Image, CloseButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon, ChatIcon } from '@chakra-ui/icons';

import errorImg from './assets/drive.gif';

import './App.css';

import WebApp from '@twa-dev/sdk'
import { Goods } from './types'
import { GoodsCard } from './components/GoodsCard'

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode();

  const [goods, setGoods] = useState<Goods[]>([]);

  useEffect(() => {
    fetch('https://8012ef8b24365029.mokky.dev/goods')
      .then(res => res.json())
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
      <Heading textAlign='left' mb={4}>Заказ</Heading>
      <Grid templateColumns='1fr 1fr 1fr' gap={4}>
        {goods.map(item => (
          <GridItem key={item.id} w='100%'>
            <GoodsCard item={item} />
          </GridItem>
        ))}
      </Grid>
      <Center p={4}>
        <Button onClick={() => WebApp.showAlert(`Так пиздуй приготовь хавку, че расселся?`)}>
          Жестко хочу жрать!
        </Button>
      </Center>
      <IconButton
        isRound={true}
        variant='solid'
        colorScheme='teal'
        aria-label='Add'
        fontSize='1rem'
        icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
      />

      <IconButton
        isRound={true}
        variant='solid'
        colorScheme='teal'
        aria-label='Add'
        fontSize='1rem'
        icon={<ChatIcon />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={4}>
          <CloseButton onClick={onClose} />
          <Heading as='h3' color='tomato' mb={4}>Произошла ошибка</Heading>
          <Image src={errorImg} borderRadius={4} alt="Ошибка" />
        </ModalContent>
      </Modal>
    </>
  )
}

export default App
