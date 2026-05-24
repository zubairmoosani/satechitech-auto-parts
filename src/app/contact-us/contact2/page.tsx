import Footer1 from "@/components/footer/Footer1";
import TopNavBar2 from "@/components/TopNav/TopNavBar2";
import ContactForm from "./components/ContactForm";
import ContactLocations from "./components/ContactLocations";

const Contact2Page = () => {
  return (
    <>
      <TopNavBar2 />

      <main>
        <ContactForm />
        <ContactLocations />
      </main>

      <Footer1 />
    </>
  );
};

export default Contact2Page;
