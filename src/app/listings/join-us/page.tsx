import Footer1 from "@/components/footer/Footer1";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import ActionBox from "./components/ActionBox";
import Benefits from "./components/Benefits";
import Counter from "./components/Counter";
import Hero from "./components/Hero";
import Testimonial from "./components/Testimonial";

const ListingsJoinUs = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <Hero />
        <Counter />
        <Benefits />
        <Testimonial />
        <ActionBox />
      </main>
      <Footer1 />
    </>
  );
};

export default ListingsJoinUs;
