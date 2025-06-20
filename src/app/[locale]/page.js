import { getTranslations, setRequestLocale } from 'next-intl/server';
import MainPart from '@/components/home/MainPart';
import LogoAnimation from '@/components/home/LogoAnimation';
import WhatWeOffer from '@/components/home/WhatWeOffer';
import Services from '@/components/home/Services';
import Projects from '@/components/home/Projects';
import Partners from '@/components/home/Partners';
import Team from '@/components/home/Team';
import AboutUs from '@/components/home/AboutUs';
import PageFade from '@/components/common/PageFade';

export default async function Home({ params }) {
  const { locale } = await params;

  // Set the request locale for the current route
  setRequestLocale(locale);

  // Load translations from the 'HomePage' namespace
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return (
    <PageFade>
      <MainPart />
      <div>
        <LogoAnimation />
      </div>
      <WhatWeOffer />
      <Services />
      <Projects />
      <Partners />
      <Team />
      <AboutUs />
      {/* <Footer /> */}
    </PageFade>
  );
}
