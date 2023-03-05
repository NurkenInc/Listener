import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreateAndEditModal({
    placeholder,
    onChange,
    onClick,
}: {
    placeholder: string;
    onChange: any;
    onClick: any;
}) {
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
