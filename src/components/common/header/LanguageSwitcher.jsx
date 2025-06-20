import React from "react";

const LanguageSwitcher = ({ locale, switchLanguage, hideDesk }) => {
  const activeTextClass = hideDesk ? "text-white" : "text-black";

  return (
    <div className={`flex cursor-pointer gap-6 text-xl lg:text-sm`}>
      <p
        onClick={() => switchLanguage("ka")}
        className={`${locale === "ka" ? activeTextClass : "text-site-gray-font"} ${
          hideDesk ? "block lg:hidden" : "hidden lg:block"
        }`}
      >
        GEO
      </p>
      <p
        onClick={() => switchLanguage("en")}
        className={`${locale === "en" ? activeTextClass : "text-site-gray-font"} ${
          hideDesk ? "block lg:hidden" : "hidden lg:block"
        }`}
      >
        ENG
      </p>
    </div>
  );
};

export default LanguageSwitcher;
