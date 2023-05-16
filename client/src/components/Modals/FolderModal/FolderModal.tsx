import React from 'react';
import {
  Modal, 
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react'

interface FolderModalProps {
  isOpen: boolean,
  onClose: any,
}

const FolderModal = ({ isOpen, onClose } : FolderModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className='bg-black inline-block text-center align-middle'>
          <ModalHeader p={1}>
            <div className='flex items-center justify-around gap-8'>
              <p className='font-light text-[15px]'>| New folder</p>
              <button className='font-normal text-[15px] px-4  hover:bg-slate-200 hover:border-none border-none py-2'>Add folder</button>
            </div>
          </ModalHeader>
          <ModalCloseButton className='font-light' />
          <ModalBody>
            <p className='text-left font-light'>Enter folder name</p>
            <input 
              type="text"
              placeholder='Unset'
              className='font-bold text-[50px] text-left pl-8 w-[100%] focus:outline-none'
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FolderModal;