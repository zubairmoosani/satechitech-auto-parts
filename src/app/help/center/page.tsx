import Footer1 from "@/components/footer/Footer1";
import TopHelpNav from "@/components/HelpTopNav/TopHelpNav";
import ActionBoxes from "./components/ActionBoxes";
import FAQs from "./components/FAQs";
import Hero from "./components/Hero";
import PopularArticleSlider from "./components/PopularArticleSlider";

const HelpCenter = () => {
  return (
    <>
      <TopHelpNav />
      <main>
        <Hero />
        <FAQs />
        <ActionBoxes />
        <PopularArticleSlider />
      </main>
      <Footer1 />
    </>
  );
};

export default HelpCenter;
