import Footer1 from "@/components/footer/Footer1";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import RoomGallery from "./components/RoomGallery";
import RoomSelection from "./components/RoomSelection";

const RoomeDetail = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <RoomGallery />
        <RoomSelection />
      </main>
      <Footer1 />
    </>
  );
};

export default RoomeDetail;
