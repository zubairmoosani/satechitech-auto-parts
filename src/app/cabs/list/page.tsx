import Footer1 from "@/components/footer/Footer1";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import CabCardList from "./components/CabCardList";
import Hero from "./components/Hero";

const CabList = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <Hero />
        <CabCardList />
      </main>
      <Footer1 />
    </>
  );
};

export default CabList;
