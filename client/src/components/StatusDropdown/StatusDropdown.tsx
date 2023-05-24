import React, { useState, useEffect } from "react";
import { motion, animate, stagger, useAnimate } from "framer-motion";
import { 
  AiFillCheckSquare, 
  AiFillCloseSquare, 
  AiFillClockCircle 
} from 'react-icons/ai';

const staggerDropdownItems = stagger(0.1, { startDelay: 0.15 });

const useDropdownAnimation = (isOpen : boolean) => {
  const [scope, animate] = useAnimate();
  
  useEffect(() => {
    animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(10% 50% 90% 50% round 10px)"
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerDropdownItems : 0
      }
    );
  }, [isOpen]);

  return scope;
}

const StatusDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const scope = useDropdownAnimation(isOpen);
  
  return (
    <div ref={scope} className='w-[300px] drop-shadow-[1px_1px_1px_#5116a9]'>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className='w-[100%] px-[20px] py-[10px] font-bold bg-white border-none rounded-[10px] cursor-pointer text-left flex items-center mb-[10px]'
      >
        Status
        <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </div>
      </motion.button>
      <ul
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          clipPath: 'inset(10% 50% 90% 50% round 10px)'
        }}
        className='flex-col bg-[white]'
      >
        <li className='block my-[5px] border-green-400 border-[2px] rounded-lg p-[5px] origin-[-20%_50%] text-green-400'>Done</li>
        <li className='block my-[5px] border-yellow-400 border-[2px] rounded-lg p-[5px] origin-[-20%_50%] text-yellow-400'>In Progress</li>
        <li className='block my-[5px] border-red-400 border-[2px] rounded-lg p-[5px] origin-[-20%_50%] text-red-400'>Not done</li>
      </ul>
    </div>
  )
}

export default StatusDropdown;