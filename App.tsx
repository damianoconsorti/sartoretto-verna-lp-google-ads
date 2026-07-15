import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import PerformanceSection from './components/PerformanceSection';
import ComparisonTable from './components/ComparisonTable';
import StatsSection from './components/StatsSection';
import ProjectGallery from './components/ProjectGallery';
import MethodSection from './components/MethodSection';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

function App() {
  return (
    <main className="bg-dark text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBar />
      <PerformanceSection />
      <ComparisonTable />
      <StatsSection />
      <ProjectGallery />
      <MethodSection />
      <Testimonials />
      <ContactForm />
      <FAQSection />
      <Footer />
    </main>
  );
}

export default App;
