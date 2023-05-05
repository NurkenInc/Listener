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

const testNotes = [
  {
    name: 'etc',
    subnotes: [
      {
        name: 'idk'
      },
      {
        name: 'whatever'
      },
      {
        name: 'lol'
      },
    ]
  },
  {
    name: 'whatever'
  },
  {
    name: 'idontcare'
  },
  {
    name: 'tatatata'
  }
]

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
                <div className='flex justify-between items-center'>
                  <div className='px-8 font-bold text-white text-[20px]'>
                    <h3>Listener</h3>
                  </div>
                  <div className='text-right py-4'>
                    <button className='bg-transparent text-white px-2 py-2' onClick={onClose}>
                      <AiOutlineClose />
                    </button>
                  </div>
                </div>
                <div>
                  <div className='hover:bg-white py-3 px-1 text-white'>
                    General
                  </div>
                  {/* link to general page  */}
                  <div className='hover:bg-white py-3 px-1 text-white'>
                    Notes
                  </div>
                    <div className='text-white'>
                      {
                        testNotes.map((item) => (
                          <div>
                            <div className='hover:bg-white px-1 py-3'>
                              {item.name}
                            </div>
                            {
                              item?.subnotes?.map((item) => (
                                <div className='pl-4 py-3 hover:bg-white'>
                                  {item.name}
                                </div>
                              ))
                            }
                          </div>
                        ))
                      }
                    </div>
                  <div className='hover:bg-white py-3 px-1 text-white'>
                    Contact us
                  </div>
                </div>
              </div>
            </DrawerBody>
           
          </DrawerContent>
        </Drawer>
    </>
  )
}

export default Sidebar