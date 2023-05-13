import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='h-[100vh]'>
      <div className='flex md:flex-row flex-col justify-end items-center'>
        <div className='flex flex-col mr-[5vw] ml-[5vw] mt-[15vh]'>
          <h1 className='md:text-[150px] text-[100px]'>Oops!</h1>
          <h3 className='mt-[1vw]'>
              Something went wrong, but it's fine!
          </h3>
          <button
              onClick={() => {
                  navigate("/home");
              }}
              className='mt-[1vw] bg-[#ef5543] text-black px-[70px]'
          >
              Home page
          </button>
        </div>
        <img
          src='fallenIceCreamErr.png'
          alt='fallen ice cream error'
          className='w-[80vw] h-[40vh] mt-[7vh] md:h-[80vh] md:w-[40vw] md:mt-[10vh] md:mr-[10vw]'
        />
      </div>
    </div>
  );
}

export default NotFound;