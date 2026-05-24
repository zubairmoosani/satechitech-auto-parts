import Footer1 from "@/components/footer/Footer1";
import TopNavBar2 from "@/components/TopNav/TopNavBar2";
import ActionBox from "./components/ActionBox";
import AllFAQs from "./components/AllFAQs";
import Hero from "./components/Hero";

const Faqs = () => {
  return (
    <>
      <TopNavBar2 />

      <main>
        <Hero />
        <AllFAQs />
        <ActionBox />
      </main>

      <Footer1 />
    </>
  );
};

export default Faqs;
