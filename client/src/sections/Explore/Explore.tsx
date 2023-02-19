'use client';

import { useState } from "react";
import { motion } from "framer-motion";

import styles from '../../styles';
import { staggerContainer } from '../../utils/motion';

import ExploreCard from "../../components/ExploreCard/ExploreCard";
import { TitleText , TypingText } from "../../components/CustomTexts/CustomTexts";

import { exploreWorlds } from '../../constants';

const Explore = () => {
    const [active, setActive] = useState('note-2')

    return (
    <section className={`${styles.paddings}`} id="explore">
        <motion.div 
            variants={{...staggerContainer}}
            initial="hidden"
            whileInView="show"
            viewport={{once: false, amount: 0.25}}
            className={`${styles.innerWidth} mx-auto flex-col`}
        >
            <TypingText title="Platform" textStyles="text-center"/>
            <TitleText title={<>How about<br className="md:block hidden" /> exploring out platform </>} textStyles="text-center leading-[45px] md:leading-[80px]"/>
                <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
                {exploreWorlds.map((world, index) => (
                    <ExploreCard 
                        key={world.id}
                        id={world.id}
                        imgUrl={world.imgUrl}
                        title={world.title}
                        description={world.description?.toString()}
                        index={index}
                        active={active}
                        handleClick={setActive}
                    />
                ))}
            </div>
        </motion.div>
    </section>
  )
};

export default Explore;
