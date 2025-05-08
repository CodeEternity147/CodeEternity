// ... existing code ...
import MainLayout from '../MainLayout'
import ContactUs from '../ContactUs'
import FAQSection from '../FAQSection'
import DealSection from '../Home/DealSection'
// ... existing code ...

function ContactPage() {
  return (
    <MainLayout>
      <ContactUs />
      <FAQSection />
      <DealSection />
      
    </MainLayout>
  )
}

export default ContactPage