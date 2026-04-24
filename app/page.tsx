import Header from "./components/Header";
import Home from "./components/Home";
import Overview from "./components/Overview";
import Highlights from "./components/Highlights";
// import MasterPlan from "./components/MasterPlan";
import Aminities from "./components/Aminities";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import Infrastructure from "./components/Infrastructure";
// import InfiniteAccess from "./components/InfiniteAccess";
import Contactus from "./components/Contactus";
import Partners from "./components/Partners";
import Footer from "./components/Footer";
import LeadPopup from "./components/LeadPopup";
// import Investment from "./components/Investment";
import Pricing from "./components/Pricing";
import WhatsAppPopup from "./components/WhatsAppPopup";
import CallNowButton from "./components/CallNowButton";
import StickyButton from "./components/StickyButton";
import ScrollToTop from "./components/ScrollToTop";
// import Configuration from "./components/Configuration";

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <Home />
      <Overview />
      <Highlights />
      <Aminities />
      <Pricing />
      <Infrastructure />
      {/* <Investment /> */}
      {/* <MasterPlan />
      <Configuration /> */}
      {/* <InfiniteAccess /> */}
      <Gallery />
      <Location />
      <Contactus />
      <Partners />
      <Footer />
      <LeadPopup />
      <WhatsAppPopup />
      <CallNowButton />
      <StickyButton />
      <ScrollToTop />
    </div>
  );
}
