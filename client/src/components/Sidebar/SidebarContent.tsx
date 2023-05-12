import React from 'react'
import { useNavigate } from 'react-router-dom'

import NotesList from './NotesList'

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

const SidebarContent = () => {
  const navigate = useNavigate();

  const handleGeneralOptionClick = () => {
    navigate('/listener')
  }

  return (
    <div>
      <div onClick={handleGeneralOptionClick} className='hover:bg-white py-3 px-1 text-black cursor-pointer'>
        General
      </div>
      {/* link to general page  */}
      <div className='text-black'>
        <NotesList notes={testNotes} />
      </div>
    </div>
  )
}

export default SidebarContent