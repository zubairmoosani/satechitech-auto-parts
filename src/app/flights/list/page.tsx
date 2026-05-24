import Footer1 from "@/components/footer/Footer1";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import FlightLists from "./components/FlightLists";
import Hero from "./components/Hero";
import NoticeBoard from "./components/NoticeBoard";

const FlightList = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <Hero />
        <NoticeBoard />
        <FlightLists />
      </main>
      <Footer1 />
    </>
  );
};

export default FlightList;
