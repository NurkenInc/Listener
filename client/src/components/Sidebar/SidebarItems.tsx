import React from 'react'
import {
  Editable,
  EditableInput,
  EditablePreview
} from '@chakra-ui/react'

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

const SidebarItems = () => {
  
  return (
    <div>
      <div className='hover:bg-white py-3 px-1 text-black'>
        General
      </div>
      {/* link to general page  */}
      <div className='hover:bg-white py-3 px-1 text-black'>
        Notes
      </div>
      <div className='text-black'>
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
    </div>
  )
}

export default SidebarItems