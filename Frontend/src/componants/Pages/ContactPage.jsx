// ... existing code ...
import MainLayout from '../MainLayout'
import ContactUs from '../ContactUs'
import FAQSection from '../FAQSection'
import DeelSection from '../Home/DeelSection'
// ... existing code ...

function ContactPage() {
  return (
    <MainLayout>
      <ContactUs />
      <FAQSection />
      <DeelSection />
      
    </MainLayout>
  )
}

export default ContactPage