import React, { useRef } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const openBtnRef = useRef<any>() 

  return (
    <>
      <Button ref={openBtnRef} colorScheme='teal' onClick={onOpen}>
        <AiOutlineMenu />
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
              <div className='bg-black w-[30%] h-[100vh]'>
                <div className='flex justify-between items-center'>
                  <div className='px-8 font-bold text-white text-[20px]'>
                    <h3>Listener</h3>
                  </div>
                  <div className='text-right p-4'>
                    <button className='bg-transparent text-white px-2 py-2' onClick={onClose}>
                      <AiOutlineClose />
                    </button>
                  </div>
                </div>
                <div className='hover:bg-white py-3 text-white'>General</div>
                {/* link to general page  */}
                <div className='hover:bg-white py-3 text-white'>Notes</div>
                {/* // notes list */}
                <div className='hover:bg-white py-3 text-white'>Contact us</div>
              </div>
            </DrawerBody>
           
          </DrawerContent>
        </Drawer>
    </>
  )
}

export default Sidebar