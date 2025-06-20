"use client";

import dynamic from "next/dynamic";
import usePartners from "@/hooks/api/usePartners";
import AnimatedSection from "../common/AnimatedSection";
import { useTranslations } from "next-intl";

// lazy-load to avoid “window is not defined” during SSR
const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });

const Partners = () => {
  const { data: partners } = usePartners();
  const t = useTranslations("HomePage");

  const partnerImages =
    partners?.docs?.map((p) => ({
      url: p.image?.url,
      alt: p.image?.alt || p.title,
    })) ?? [];

  if (!partnerImages.length) return null; // nothing to show yet

  return (
    <AnimatedSection
      className="mt-36 !font-clash overflow-hidden"
      id="partners"
    >
      <h1 className="text-site-dark-font mb-[60px] lg:text-[56px] text-2xl uppercase font-semibold">
        {t("partners")}
      </h1>

      {/* silky-smooth infinite loop */}
      <Marquee
        speed={40}          // px per second
        gradient={false}    // turn off default edge‐fade
        pauseOnHover={false}
        autoFill            // duplicates content under the hood
        className="gap-16"  // spacing BETWEEN items
      >
        {partnerImages.map((img, i) => (
          <div key={i} className="flex justify-center items-center mx-8">
            <img
              src={img.url}
              alt={img.alt}
              className="h-16 object-contain pointer-events-none select-none"
              draggable={false}
            />
          </div>
        ))}
      </Marquee>
    </AnimatedSection>
  );
};

export default Partners;