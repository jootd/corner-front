"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import useServices from "@/hooks/api/useServices";
import useLocations from "@/hooks/api/useLocations";

const Services = () => {
  const { data: services } = useServices();
  const { data: locationsData } = useLocations();

  const [activeStep, setActiveStep] = useState(0);
  const itemRefs = useRef([]);
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      let maxVisibleIndex = 0;

      itemRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const midpoint = window.innerHeight / 2;
        if (rect.top < midpoint) {
          maxVisibleIndex = index;
        }
      });

      setActiveStep(maxVisibleIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLocationClick = () => {
    router.push(`/${currentLocale}/locations`);
  };

  const serviceList = [...(services?.docs || [])].sort((a, b) => a.id - b.id);

  return (
    <div className="mt-20 space-y-8" id="services">
      {serviceList.map((service, index) => {
        const showLocations = service.id === 1;
        const locations = showLocations ? locationsData?.docs || [] : [];

        return (
          <ServiceItem
            key={service.id}
            service={service}
            index={index}
            isActive={index <= activeStep}
            innerRef={(el) => (itemRefs.current[index] = el)}
            handleLocationClick={handleLocationClick}
            locations={locations}
          />
        );
      })}
    </div>
  );
};

const ServiceItem = ({
  service,
  isActive,
  innerRef,
  handleLocationClick,
  locations,
}) => {
  const gifPath = "/images/services/flower.gif"; // ✅ Replace with actual gif path

  return (
    <div
      ref={innerRef}
      className="py-6 border-b border-dashed border-[#CDCDCD] !font-clash flex lg:flex-row flex-col justify-between items-start text-black transition-all duration-700"
    >
      {/* Text section */}
      <div className="flex lg:flex-row flex-col">
        <h1 className="font-semibold min-w-[300px] uppercase">
          {service.title}
        </h1>
        <div>
          <h1 className="text-site-gray-font max-w-[300px] lg:mt-0 mt-4 lg:mb-0 mb-8">
            {service.desc}
          </h1>

          {locations.length > 0 && (
            <div className="space-y-2 mt-10">
              {locations.map((location, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={handleLocationClick}
                >
                  <img src="/images/icons/map.svg" alt="map icon" />
                  <span className="text-[#000000] font-medium">
                    {location.address}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Animated GIF image section */}
      <div className="flex justify-center items-center transition-all duration-700">
        {/* Desktop View */}
        <motion.div
          animate={{
            width: isActive ? "330px" : "150px",
            height: isActive ? "300px" : "120px",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="rounded-tr-[20px] rounded-bl-[20px] lg:flex hidden justify-center items-center overflow-hidden"
        >
          <img
          src={gifPath}
            alt="service gif"
            className="w-full h-full object-contain p-4"
          />
        </motion.div>

        {/* Mobile View */}
        <img
          src={gifPath}
          alt="service gif"
          className="w-full h-full object-contain p-4 lg:hidden"
        />
      </div>
    </div>
  );
};

export default Services;
