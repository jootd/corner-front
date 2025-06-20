"use client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import AnimatedSection from "../common/AnimatedSection";
const AboutUs = () => {
  const t = useTranslations("HomePage");
  const router = usePathname(); // Get the current locale (language)

  const isEnglish = router.startsWith("/en");

  return (
    <AnimatedSection
      className={`${
        isEnglish ? " text-[56px]" : " text-[42px]"
      } lg:block hidden font-semibold text-site-dark-font leading-14 mt-40 uppercase`}
    >
      <h2> {t("about")}</h2>
    </AnimatedSection>
  );
};

export default AboutUs;
