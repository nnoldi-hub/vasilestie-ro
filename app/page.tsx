import { Hero } from '@/components/sections/hero';
import { Categories } from '@/components/sections/categories';
import { FeaturedCraftsmen } from '@/components/sections/featured-craftsmen';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Testimonials } from '@/components/sections/testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedCraftsmen />
      <HowItWorks />
      <Testimonials />
    </>
  );
}