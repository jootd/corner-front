"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MobileMenu from "./MobileMenu"; // 👈 import dropdown component
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Modal = dynamic(() => import("../../home/Modal"), { ssr: false });

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState("ka");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 👈 menu toggle
  const t  = useTranslations("Navigation");
   
  useEffect(() => {
    const currentLocale = pathname.split("/")[1];
    if (currentLocale === "en" || currentLocale === "ka") {
      setLocale(currentLocale);
    }
  }, [pathname]);

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("services"), href: "services" },
    { name: t("work"), href: "work" },
    { name: t("partners"), href: "partners" },
  ];

  const switchLanguage = (newLocale) => {
    if (newLocale === locale) return;
    const pathWithoutLocale = pathname.replace(/^\/(en|ka)/, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const handleScrollTo = (id) => {
    if (id === "/") {
      router.push(`/${locale}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = 0;
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full bg-[#eeeeee] sticky top-0 z-[1002]">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between text-black !font-clash uppercase font-semibold">
      <Link href={`/${locale}`}>
      <img
        src="/images/icon.svg"
        className="lg:w-[200px] w-[110px]"
        alt="logo"
      />
  </Link>
      <motion.div className="hidden lg:block">
        <div className="ml-10 flex items-center gap-9">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleScrollTo(item.href)}
              className="relative flex items-center rounded-md px-3 py-2 text-sm transition-opacity duration-200 hover:opacity-45"
            >
              <h2>{item.name}</h2>
            </button>
          ))}
        </div>
      </motion.div>
  
      <div className="flex gap-3 items-center cursor-pointer text-sm font-semibold uppercase">
        <h2
          onClick={() => setIsModalOpen(true)}
          className="text-site-dark-font lg:mr-7 mr-3 font-semibold uppercase"
        >
          {t("lets_talk")}
        </h2>
        <LanguageSwitcher locale={locale} switchLanguage={switchLanguage} />
        <div className="h-6 w-6 flex items-center justify-center lg:hidden">
          <img
            src={
              isMenuOpen
                ? "/images/icons/close.svg"
                : "/images/icons/burger.svg"
            }
            alt="menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
        </div>
      </div>
    </div>
    <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            navItems={navItems}
            handleScrollTo={handleScrollTo}
            locale={locale}
            switchLanguage={switchLanguage}
          />
        )}
      </AnimatePresence>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  </div>
  );
};

export default Navigation;
