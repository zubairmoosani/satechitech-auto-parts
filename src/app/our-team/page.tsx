import Footer1 from "@/components/footer/Footer1";
import TopNavBar2 from "@/components/TopNav/TopNavBar2";
import ActionBox from "./components/ActionBox";
import Hero from "./components/Hero";
import Teams from "./components/Teams";

const OurTeam = () => {
  return (
    <>
      <TopNavBar2 />

      <main>
        <Hero />
        <Teams />
        <ActionBox />
      </main>

      <Footer1 />
    </>
  );
};

export default OurTeam;
