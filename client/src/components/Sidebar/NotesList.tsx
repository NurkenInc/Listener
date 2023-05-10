import React, { useState, useRef, useMemo, useCallback } from 'react'
import { Collapse, useDisclosure } from '@chakra-ui/react'

import { FiEdit } from 'react-icons/fi'
import { BsCheck2Square } from 'react-icons/bs'
import { AiOutlineCloseSquare, AiOutlineArrowRight } from 'react-icons/ai'

interface NoteItemProps {
  text: string,
  handleToggleSubnotes?: any,
  isSubnotesOpen: boolean
}

const NotesItem = ({ text, isSubnotesOpen, handleToggleSubnotes } : NoteItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const noteInputRef = useRef<any>(null);

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

  // console.log('rerender')

  return (
    <div className='px-1 py-3 hover:bg-white'>
      <div className='flex gap-3 items-center justify-between'>
        <div onClick={handleToggleSubnotes} className='flex'>
          <input
            ref={noteInputRef}
            defaultValue={text}
            className='w-[100%] bg-inherit rounded-md'
            readOnly={!isEditing}
            disabled={true}
            />
          {
            handleToggleSubnotes ? (
              <div className={`hover:bg-slate-200 p-1 rounded-md ${isSubnotesOpen ? 'rotate-90' : 'rotate-0'} transition-all duration-200`}>
                <AiOutlineArrowRight size='1rem' />
              </div>
            ) : null
          }
        </div>
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
      </div>
    </div>
  )
}
const MemorizedNoteItem = React.memo(NotesItem)

const NotesList = ({ notes } : { notes: Array<any> }) => {

  const Subnotes = ({ note }: { note : any }) => {
    return (
      <>
        {
          note?.subnotes?.map((item : any) => (
            <div key={item.name} className='pl-4 py-3 hover:bg-white'>
              {item.name}
            </div>
          ))
        }
      </>
    )
  }

  const Note = ({ note } : { note: any }) => {
    const { isOpen, onToggle } = useDisclosure();

    const handleToggleSubnotes = () => {
      onToggle();
    }



    return (
      <div>
        <MemorizedNoteItem text={note.name} isSubnotesOpen={isOpen} handleToggleSubnotes={handleToggleSubnotes} />
        <Collapse in={isOpen} animateOpacity >
          <Subnotes note={note} />
        </Collapse>
      </div>
    )
  }
  
  return (
    <>
      {
        notes.map((item) => (
          <Note note={item} key={item.name} />
        ))
      }
    </>
  )
}

export default NotesList