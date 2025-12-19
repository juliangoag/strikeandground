// Página Principal - Landing Page
import { Hero } from '../components/Hero';
import { EventsSection } from '../components/EventsSection';
import { BenefitsSection } from '../components/BenefitsSection';
import { SecuritySection } from '../components/SecuritySection';

export function HomePage() {
  return (
    <>
      <Hero />
      <EventsSection />
      <BenefitsSection />
      <SecuritySection />
    </>
  );
}

