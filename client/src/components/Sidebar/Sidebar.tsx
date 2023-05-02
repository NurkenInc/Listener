import React, { RefAttributes, useRef } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const openBtnRef = useRef<any>() 

  return (
    <aside>
      <Button onClick={onOpen} ref={openBtnRef}>BurgerMenu icon</Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={openBtnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Listener</DrawerHeader>
            <DrawerBody>

            </DrawerBody>
          </DrawerContent>
      </Drawer> 
    </aside>
  )
}

export default Sidebar