// Página Principal - Landing Page
import { Hero } from '../components/home/Hero';
import { EventsSection } from '../components/home/EventsSection';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { SecuritySection } from '../components/home/SecuritySection';

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

