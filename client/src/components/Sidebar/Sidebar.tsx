import React, { useRef } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { AiOutlineMenu } from 'react-icons/ai'

import { SidebarFooter, SidebarHeader, SidebarItems } from '../Sidebar'

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const openBtnRef = useRef<any>() 

  return (
    <>
      <Button
        ref={openBtnRef}
        colorScheme='teal'
        onClick={onOpen}
        position={'fixed'}
        top={11}
      >
        <AiOutlineMenu size={30} />
      </Button>
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          finalFocusRef={openBtnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            
            <DrawerBody>
              <div className='bg-black w-[200px] h-[100vh]'>
                <SidebarHeader onClose={onClose} />
                <SidebarItems />
                <SidebarFooter />
              </div>
            </DrawerBody>
           
          </DrawerContent>
        </Drawer>
    </>
  )
}

export default Sidebar