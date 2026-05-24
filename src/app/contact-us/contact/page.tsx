import Footer1 from "@/components/footer/Footer1";
import TopNavBar2 from "@/components/TopNav/TopNavBar2";
import AddressMap from "./components/AddressMap";
import ContactForm from "./components/ContactForm";
import Hero from "./components/Hero";

const Contact = () => {
  return (
    <>
      <TopNavBar2 />

      <main>
        <Hero />
        <ContactForm />
        <AddressMap />
      </main>

      <Footer1 />
    </>
  );
};

export default Contact;
