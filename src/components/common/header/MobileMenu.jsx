"use client";

import { motion } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

const MobileMenu = ({
  isOpen,
  onClose,
  navItems,
  handleScrollTo,
  locale,
  switchLanguage,
}) => {
  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 lg:hidden min-h-[416px] z-[1002] !font-clash uppercase font-semibold bg-[#26292D] text-site-gray-font rounded-[12px] mt-[62px] mx-4 px-6 py-8"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  handleScrollTo(item.href);
                  onClose(); // Close after click
                }}
                className="text-left text-lg uppercase"
              >
                {item.name}
              </button>
            ))}
            <div className="w-full h-[2px] my-4 bg-[#3D4248]"></div>
            <LanguageSwitcher locale={locale} switchLanguage={switchLanguage} hideDesk={true} />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default MobileMenu;
