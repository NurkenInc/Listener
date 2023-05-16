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

import { SidebarFooter, SidebarHeader, SidebarContent } from '../Sidebar'

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const openBtnRef = useRef<any>() 

  return (
    <>
      <Button
        ref={openBtnRef}
        onClick={onOpen}
        variant='ghost'
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
        size='xs'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p={0} className='bg-[#fafafa]' >
            <SidebarHeader onClose={onClose} />
            <div className='flex-col space-y-40'>
              <SidebarContent />
              <SidebarFooter />
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Sidebar