import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { Collapse, useDisclosure } from '@chakra-ui/react'

import { FolderModal } from '@/components';

import { FiEdit } from 'react-icons/fi'
import { BsCheck2Square } from 'react-icons/bs'
import { AiOutlineCloseSquare, AiOutlineArrowRight, AiOutlineFolderAdd, AiFillDelete, AiOutlineFileAdd  } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

interface NoteItemProps {
  text: string,
  handleToggleSubnotes?: any,
  isSubnotesOpen?: boolean,
  editMode?: boolean,
}

const NotesItem = ({ text, isSubnotesOpen, handleToggleSubnotes, editMode } : NoteItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(Boolean(editMode));
  const noteInputRef = useRef<any>(null);
  
  const navigate = useNavigate();

  const handleEditing = () => {
    setIsEditing(true);
    noteInputRef!.current!.disabled = false;
    noteInputRef?.current?.focus();
  }

  const handleSaveChanges = () => {
    setIsEditing(false);
    noteInputRef!.current!.disabled = true;
  }

  const handleCancelChanges = () => {
    setIsEditing(false);
    noteInputRef!.current!.value = text;
    noteInputRef!.current!.disabled = true;
  }

  const handleAddCard = (deckId : string, cardId : string) => {
    navigate(`/listener/decks/${deckId}/cards/${cardId}`);
  }

  useEffect(() => {
    if(isEditing) handleEditing();
  }, []);

  return (
    <div className='px-1 py-3 hover:bg-white'>
      <div className='flex gap-3 items-center justify-between'>
        <div onClick={handleToggleSubnotes} className='flex items-center gap-1'>
          {
            handleToggleSubnotes && !isEditing && (
              <div className={`${isSubnotesOpen ? 'rotate-90' : 'rotate-0'} transition-all duration-200`}>
                <AiOutlineArrowRight size='1rem' />
              </div>
            )
          }
          <input
            ref={noteInputRef}
            defaultValue={text}
            className='w-[100%] bg-inherit rounded-md'
            readOnly={!isEditing}
            disabled={true}
          />
        </div>
        <div className='flex'>
          {
            handleToggleSubnotes && !isEditing && (
              <div onClick={() => handleAddCard('test', 'rewrite')} className='bg-slate-300 mr-2 rounded-md px-1 py-1 hover:bg-slate-400'>
                <AiOutlineFileAdd size='1rem' />
              </div>
            )
          }
          {
            isEditing ? (
              <div className='flex'>
                <div onClick={handleSaveChanges} className='bg-slate-300 mr-2 rounded-md px-1 py-1 hover:bg-slate-400'>
                  <BsCheck2Square size='1rem' />
                </div>
                <div onClick={handleCancelChanges} className='bg-slate-300 mr-2 rounded-md px-1 py-1 hover:bg-slate-400'>
                  <AiOutlineCloseSquare size='1rem' />
                </div>
              </div>
            ) : (
              <div onClick={handleEditing} className='bg-slate-300 mr-2 rounded-md px-1 py-1 hover:bg-slate-400'>
                <FiEdit size='1rem' />
              </div>
            )
          }
          {
            !isEditing && (
              <div className='bg-slate-300 mr-2 rounded-md px-1 py-1 hover:bg-slate-400'>
                <AiFillDelete size='1rem' />
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

const MemorizedNoteItem = React.memo(NotesItem);

const NotesList = ({ notes } : { notes: Array<any> }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const Subnotes = ({ note } : { note : any }) => {
    return (
      <>
        {
          note?.subnotes?.map((item: any) => (
            <div key={item.name}>
              <MemorizedNoteItem text={item} />
            </div>
          ))
        }
      </>
    )
  }

  const Notes = ({ notes }: { notes: Array<any> }) => {
    const { isOpen, onToggle } = useDisclosure();
    
    const handleToggleSubnotes = () => {
      onToggle();
    }
    
    return (
      <div>
        {
          notes.map((note : any) => (
            <div key={note.name}>
              <MemorizedNoteItem text={note.name} isSubnotesOpen={isOpen} handleToggleSubnotes={handleToggleSubnotes} />
              <Collapse in={isOpen} animateOpacity >
                <Subnotes note={note} />
              </Collapse>
            </div>
          ))
        }
      </div>
    )
  }
  
  return (
    <>
      <div className='hover:bg-white py-3 px-1 text-gray-500 flex items-center justify-between'>
        Notes
        <div onClick={onToggle}>
          <AiOutlineFolderAdd className='text-black bg-slate-300 mr-2 rounded-md px-1 py-1 hover:bg-slate-400' size='1.5rem' />
        </div>
      </div>
      <Notes notes={notes} />
      <FolderModal isOpen={isOpen} onClose={onClose} />
    </>
  )
  
}

export default NotesList;