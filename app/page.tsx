import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import DemoGallery from "@/components/DemoGallery";
import HowItWorks from "@/components/HowItWorks";
import Packages from "@/components/Packages";
import OrderForm from "@/components/OrderForm";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <DemoGallery />
        <HowItWorks />
        <Packages />
        <OrderForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
