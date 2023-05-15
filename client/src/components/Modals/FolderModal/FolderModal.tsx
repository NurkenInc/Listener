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
}

const FolderModal = ({ isOpen } : FolderModalProps) => {
  const { onClose } = useDisclosure();
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className='bg-black inline-block text-center align-middle'>
          <ModalHeader>Add folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>

            <Button>Idk</Button>
            </div>
            <div>

            <Button>Idk</Button>
            </div><div>

<Button>Idk</Button>
</div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FolderModal;