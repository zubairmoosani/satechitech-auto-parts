import Footer1 from "@/components/footer/Footer1";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import FlightDetails from "./components/FlightDetails";

const FlightDetail = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <FlightDetails />
      </main>
      <Footer1 />
    </>
  );
};

export default FlightDetail;
