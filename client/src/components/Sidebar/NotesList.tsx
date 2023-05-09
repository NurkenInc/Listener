import React, { useState, useRef, RefAttributes } from 'react'
import { FiEdit } from 'react-icons/fi'
import { BsCheck2Square } from 'react-icons/bs'
import { AiOutlineCloseSquare } from 'react-icons/ai'

const NotesItem = ({ text } : { text: string }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const noteInputRef = useRef<any>(null)

  const handleEditing = () =>{
    setIsEditing(true);
    console.log(noteInputRef.current);
    noteInputRef?.current?.focus();
  }

  return (
    <div className='px-1 py-3 hover:bg-white'>
      <div className='flex items-center justify-between'>
        <input
          ref={noteInputRef}
          defaultValue={text} 
          className='w-[100%] bg-inherit rounded-md'
          readOnly={!isEditing}
          // disabled={!isEditing} // todp fix when state changing interrupt focusing
        />
        {
          isEditing ? (
            <div className='flex'>
              <div onClick={() => setIsEditing(false)} className='bg-slate-300 mr-2 rounded-md px-1 py-1 hover:bg-slate-400'>
                <BsCheck2Square size='1rem' />
              </div>
              <div onClick={() => setIsEditing(false)} className='bg-slate-300 mr-2 rounded-md px-1 py-1 hover:bg-slate-400'>
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

const NotesList = ({ notes } : { notes: Array<any> }) => {
  
  const subnotes = (note : any) => {
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
  
  return (
    <>
      {
        notes.map((item) => (
          <div key={item.name}>
            <NotesItem text={item.name} />
            {/* <div className='hover:bg-white px-1 py-3'>
              {item.name}
            </div> */}
            {subnotes(item)}
          </div>
        ))
      }
    </>
  )
}

export default NotesList