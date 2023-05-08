import React, { useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { BsCheck2Square } from 'react-icons/bs'
import { AiOutlineCloseSquare } from 'react-icons/ai'

const NotesItem = ({ text } : { text: string }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  return (
    <div className='px-1 py-3 hover:bg-white'>
      <div className='flex items-center justify-between'>
        {text}
        {
          isEditing ? (
            <div className='flex'>
              <div className='bg-slate-300 mr-2 rounded-md px-1 py-1'>
                <BsCheck2Square size='1rem' onClick={() => setIsEditing(false)} />
              </div>
              <div className='bg-slate-300 mr-2 rounded-md px-1 py-1'>
                <AiOutlineCloseSquare size='1rem' onClick={() => setIsEditing(false)} />
              </div>
            </div>
          ) : (
            <div className='bg-slate-300 mr-2 rounded-md px-1 py-1'>
              <FiEdit size='1rem' onClick={() => setIsEditing(true)} />
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