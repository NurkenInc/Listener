import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

interface CreateAndEditModalProps {
  placeholder: any,
  onChange: any,
  onClick: any
}

const CreateAndEditModal = ({ placeholder, onChange, onClick}: CreateAndEditModalProps) => {
  return (
    <div className='w-full h-full flex'>
      <input
        type='text'
        name='notename'
        id='editnotename'
        placeholder={placeholder}
        className='bg-gray-50 block w-full p-1 rounded-[10px] text-black'
        onChange={(event) => onChange(event?.target.value)}
      />
      <button className='p-0 w-[40px] bg-white' onClick={onClick}>
        <FontAwesomeIcon icon={faSquareCheck} />
      </button>
    </div>
  );
}

export default CreateAndEditModal;