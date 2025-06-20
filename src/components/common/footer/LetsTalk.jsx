"use client";
import { useEffect, useState } from "react";

const LetsTalk = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-GB", { hour12: false }); // HH:MM:SS
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="text-site-gray-font !font-clash flex md:flex-row flex-col md:gap-0 gap-5 items-start md:items-center justify-between mt-24 uppercase">
        <h3 className="md:block hidden">
          <span className="text-site-dark-font font-semibold">©2025 Corner.</span>{" "}
          All rights reserved
        </h3>
        <h3>
          Tbilisi, Georgia{" "}
          <span className="text-site-dark-font font-semibold inline-block min-w-[90px]">
            {time}
          </span>
        </h3>
        <h3>
          Say hello{" "}
          <a
            href="mailto:hello@corner.ge"
            className="text-site-dark-font font-semibold"
          >
            HELLO@CORNER.GE
          </a>
        </h3>
      </div>
      <img
        src="/images/team/letstalk.svg"
        alt="lets talk"
        className="w-full mt-8"
      />
      <h3 className="md:hidden block mt-5 text-site-gray-font uppercase">
        <span className="text-site-dark-font font-semibold">©2025 Corner.</span> All
        rights reserved
      </h3>
    </>
  );
};

export default LetsTalk;
