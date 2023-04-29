import Hero from "../../sections/Hero/Hero";
import Explore from "../../sections/Explore/Explore";
import About from "../../sections/About/About";
import World from "../../sections/World/World";
import GetStarted from "../../sections/GetStarted/GetStarted";
import Footer from "../../sections/Footer/Footer";

export default function Home() {
    return (
        <>
          <Hero />
          <Explore />
          <About />
          <World />
          <GetStarted />
          <Footer />
        </>
    )
};