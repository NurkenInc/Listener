import './Hero.css';

export default function Hero() {
    return (
        <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-36">
            <div className="flex-[0.5] flex flex-col gap-8">
                <h1 className="lg:mt-0 mt-[25px] lg:text-[144px] md:text-[100px] sm:text-[60px] text-[44px] lg:leading-[145.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px] uppercase text-black lg:text-left text-center hero_title">Listener</h1>
                <p className='mx-[15px] lg:text-left text-center'>Listener is free platform, which you can use to take notes and add tasks! We want to improve ourselves and make our services better and you can show your impact by taking your first note!<br />Track your tasks,homeworks,targets and make just it!</p>
            </div>
            <div className="flex justify-center">
                <img className="md:w-[35vw] md:h-[75vh] w-[55vw] h-[37vh] object-fit " src="../../../public/get-started.png" alt="note papers" />
            </div>
        </div>
    );
}