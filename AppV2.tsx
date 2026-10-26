import React, { useEffect } from 'react';
import NavbarV2 from './components/v2/NavbarV2';
import HeroV2 from './components/v2/HeroV2';
import QuickForm from './components/QuickForm';
import PerformanceSection from './components/PerformanceSection';
import MobileStickyBar from './components/MobileStickyBar';
import GalleryV2 from './components/v2/GalleryV2';
import StatsV2 from './components/v2/StatsV2';
import MethodWaveV2 from './components/v2/MethodWaveV2';
import TestimonialsV2 from './components/v2/TestimonialsV2';
import ComparisonV2 from './components/v2/ComparisonV2';
import ContactForm from './components/ContactForm';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import { captureAttribution } from './lib/forms';

// Anteprima della nuova landing: stessi form, stessi moduli di cattura attribuzione, stessa logica; cambiano layout e immagini.
// Per sostituire la landing online basterà usare questa composizione in App.tsx.
export default function AppV2() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <main className="bg-dark text-white overflow-x-clip pb-[72px] md:pb-0">
      <NavbarV2 />
      <HeroV2 />
      <QuickForm showCall={false} />
      <PerformanceSection titlePeriod={false} alignTitles />
      <GalleryV2 />
      <StatsV2 />
      <MethodWaveV2 />
      <TestimonialsV2 />
      <ComparisonV2 />
      <ContactForm fluoButtons />
      <FAQSection titlePeriod={false} />
      <Footer />
      <MobileStickyBar />
    </main>
  );
}
