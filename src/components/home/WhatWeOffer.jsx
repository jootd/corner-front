import { useTranslations } from "next-intl";
import AnimatedSection from "../common/AnimatedSection";

const WhatWeOffer = () => {
  const t = useTranslations("HomePage");

  return (
    <AnimatedSection className="text-site-dark-font font-semibold text-[32px] lg:text-[56px] 2xl:mt-0 mt-20 lg:leading-14 uppercase">
      <h1>
        {t.rich("we_offer", {
        a: (chunks) => <span className="lg:pl-40">{chunks}</span>,
          b: (chunks) => (
            <>
              <br />
              {chunks}
            </>
          ),
          c: (chunks) => (
            <>
              <br />
              {chunks}
            </>
          ),
        })}
      </h1>
    </AnimatedSection>
  );
};

export default WhatWeOffer;
