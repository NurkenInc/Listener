import React from 'react'

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
  
  return (
    <div>
      <div className='hover:bg-white py-3 px-1 text-gray-500'>
        General
      </div>
      {/* link to general page  */}
      <div className='hover:bg-white py-3 px-1 text-gray-500'>
        Notes
      </div>
      <div className='text-black'>
        <NotesList notes={testNotes} />
      </div>
    </div>
  )
}

export default SidebarContent