"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "../common/AnimatedSection";


const MainPart = () => {
  const t = useTranslations("HomePage");

  return (
    <AnimatedSection className="lg:text-[64px] text-4xl text-center text-site-dark-font font-semibold pt-20 2xl:pt-60 2xl -mb-40 uppercase z-50 relative">
      {/* Only show on small screens */}
      <div className="block custom:hidden">
        <h1>{t("main_title_first")}</h1>
        <h2 className="text-[#A6A6A6]">{t("main_title_second")}</h2>
      </div>

      {/* Hide on small screens */}
      <div className="hidden custom:block">
        <div className="bg-[#CDCDCD] w-[1px] h-12 absolute 2xl:left-20 left-1 2xl:top-1/2 top-1/3"></div>
        <div className="bg-[#CDCDCD] w-[1px] h-24 absolute 2xl:left-32 left-10 2xl:top-2/3 top-1/2"></div>

        <div className="p-[52px] relative w-fit mx-auto">
          <div className="group relative">
            <p className="border-b pb-2 border-[#CDCDCD] absolute left-0 -top-19 text-sm font-semibold cursor-pointer">
              3D LED Billboards
            </p>
            <div className="absolute z-50 left-36 bottom-10 w-fit cursor-pointer text-sm text-white rounded-tr-[20px] rounded-bl-[20px] bg-[#FF5500] font-semibold p-[10px] rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              SEE ALL (4)
            </div>
          </div>

          <div className="flex flex-col gap-2 absolute right-0 -top-6">
            <div className="group relative">
              <p className="text-sm font-semibold cursor-pointer">
                2D-3D Animations
              </p>
              <div className="absolute z-50 -right-0 top-0 w-fit cursor-pointer text-sm text-white rounded-tr-[20px] rounded-bl-[20px] bg-[#FF5500] font-semibold p-[10px] rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                SEE ALL (4)
              </div>
            </div>
            <img src="/images/helpers/corner_border.svg" alt="border" />
          </div>

          <h1>{t("main_title_first")}</h1>
          <h2 className="text-[#A6A6A6]">{t("main_title_second")}</h2>

          <div className="border-t pt-2 border-[#CDCDCD] absolute right-40 text-sm font-semibold -bottom-6 cursor-pointer">
            3D Design
          </div>

          <div className="flex flex-col items-end gap-2 absolute left-0 -bottom-6">
            <img
              src="/images/helpers/corner_border.svg"
              alt="border"
              className="rotate-180"
            />
            <p className="text-sm font-semibold cursor-pointer">
              3D Loop Animations
            </p>
          </div>
        </div>

        <div className="bg-[#CDCDCD] w-[1px] h-12 absolute 2xl:right-44 right-6 2xl:top-1/2 top-1/3"></div>
        <div className="bg-[#CDCDCD] w-[1px] h-24 absolute 2xl:right-28 -right-6 bottom-10"></div>
      </div>
    </AnimatedSection>
  );
};

export default MainPart;
