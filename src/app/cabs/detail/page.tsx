import Footer1 from "@/components/footer/Footer1";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import MainTitle from "./components/MainTitle";
import CabDetail from "./components/CabDetail";

const CabDetails = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <MainTitle />
        <CabDetail />
      </main>
      <Footer1 />
    </>
  );
};

export default CabDetails;
