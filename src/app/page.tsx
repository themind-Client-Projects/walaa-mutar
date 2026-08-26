import { CoursesSection } from "@/components/sections/courses-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { ServicesSection } from "@/components/sections/services-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <CoursesSection />
      <ReviewsSection />
    </>
  );
}
