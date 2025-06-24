// ... existing code ...
import MainLayout from '../MainLayout'
import ContactUs from '../ContactUs'
import FAQSection from '../FAQSection'
import DealSection from '../Home/DealSection'
import useScrollToTop from '../../hooks/useScrollToTop';
// ... existing code ...

function ContactPage() {
  useScrollToTop();
  return (
    <MainLayout>
      <ContactUs />
      <FAQSection />
      <DealSection />
      
    </MainLayout>
  )
}

export default ContactPage