"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import { useContact } from "@/hooks/api/useContact";
import ReactCountryFlag from "react-country-flag";
import CountryDropdown from "@/components/common/CountryDropdown"; // Adjust the import path if needed
import { countries } from "@/components/common/countries"; // You must have a countries list with code and dial_code

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const services = [
  "3D Led Billboards",
  "2D-3D Animation",
  "3D Loop Animation",
  "3D Design",
];

const isEnglish = (text) => /^[\u0000-\u007F]*$/.test(text.trim());
const getFontClass = (text) => (isEnglish(text) ? "!font-clash" : "");

const Modal = ({ isOpen, onClose }) => {
  const t = useTranslations("letsTalk");

  const {
    formData,
    handleInputChange,
    selectedService,
    setSelectedService,
    handleSubmit,
    isPending,
    message,
  } = useContact();

  const [selectedCountry, setSelectedCountry] = useState({
    code: "GE",
    dial_code: "+995",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] bg-white flex lg:flex-row flex-col lg:h-screen h-full overflow-y-auto lg:overflow-hidden !font-clash uppercase lg:px-10 lg:py-16"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Left Side */}
          <motion.div
            className="lg:w-1/2 w-full flex items-start lg:justify-start p-6 relative"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h1 className="lg:text-[100px] text-[48px] text-site-dark-font font-semibold leading-none">
              {t.rich("title", {
                br: (chunks) => (
                  <>
                    <br />
                    {chunks}
                  </>
                ),
              })}
            </h1>
            {message && (
              <div className="bg-[#E0FD43] text-site-dark-font px-5 py-3 mt-4 text-sm font-semibold absolute bottom-0 left-0 flex items-center gap-3 normal-case">
                <img src="/images/icons/check.svg" alt="check" />
                <p>{message.text}</p>
              </div>
            )}
          </motion.div>

          {/* Right Side */}
          <motion.div
            className="lg:w-1/2 w-full relative flex flex-col justify-start gap-6 px-6 pb-10"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="absolute lg:block hidden -top-10 right-0 cursor-pointer p-2"
              >
                <img src="/images/icons/close.svg" alt="close" />
              </button>
            </div>

            <div className="lg:pr-6 lg:max-w-[534px] w-full relative">
              {/* Service Selector */}
              <h2 className="text-sm font-semibold text-site-gray-font mb-1 block">
                {t("choose_service")}
              </h2>
              <div className="flex flex-wrap gap-3">
                {services.map((service) => {
                  const isSelected = selectedService === service;
                  return (
                    <button
                      key={service}
                      onClick={() => setSelectedService(service)}
                      className={`border border-[#CDCDCD] px-6 py-4 rounded-lg text-sm font-semibold ${
                        isSelected
                          ? "bg-[#767C85] text-white"
                          : "text-site-dark-font"
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-5 mt-10">
                {/* Full Name */}
                <div className="flex flex-col">
                  <h2 className="text-sm font-semibold text-site-gray-font">
                    {t("full_name")}
                  </h2>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className={`border-b border-[#CDCDCD] py-1 bg-transparent outline-none text-[24px] font-semibold text-site-dark-font ${getFontClass(
                      formData.fullName
                    )}`}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <h2 className="text-sm font-semibold text-site-gray-font">
                    {t("email")}
                  </h2>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`border-b border-[#CDCDCD] py-1 bg-transparent outline-none text-[24px] font-semibold text-site-dark-font ${getFontClass(
                      formData.email
                    )}`}
                  />
                </div>

                {/* Phone with Flag */}
                <div className="flex flex-col">
                  <h2 className="text-sm font-semibold text-site-gray-font">
                    {t("phone")}
                  </h2>
                  <div className="relative">
                    <div
                      className="flex items-center gap-2 cursor-pointer text-site-dark-font absolute top-1/2 -translate-y-1/2 left-0"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <div className="pl-2 flex items-center gap-2">
                        <ReactCountryFlag
                          countryCode={selectedCountry.code}
                          svg
                        />
                        <img
                          src="/images/icons/arrow-down.svg"
                          alt="dropdown"
                        />
                        <p className="text-[24px] text-site-gray-font font-semibold">
                          {selectedCountry.dial_code}
                        </p>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="w-full border-b border-[#CDCDCD] py-1 pl-[120px] bg-transparent outline-none text-[24px] font-semibold text-site-dark-font !font-clash"
                    />

                    <CountryDropdown
                      countries={countries}
                      isOpen={isDropdownOpen}
                      setIsOpen={setIsDropdownOpen}
                      setSelectedCountry={setSelectedCountry}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <h2 className="text-sm font-semibold text-site-gray-font">
                    {t("message")}
                  </h2>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    className={`border-b border-[#CDCDCD] py-1 bg-transparent outline-none resize-none h-[44px] text-[24px] font-semibold text-site-dark-font ${getFontClass(
                      formData.message
                    )}`}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="mt-4 text-[64px] font-semibold text-site-dark-font uppercase disabled:opacity-50"
              >
                {isPending ? "Sending..." : t("send")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
