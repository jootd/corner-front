'use client';

import { useTranslations } from "next-intl";
import AnimatedSection from "../common/AnimatedSection";
import CommonTitle from "../common/CommonTitle";
import useTeam from "@/hooks/api/useTeam";
import { useState } from "react";

const Team = () => {
  const t = useTranslations("HomePage");
  const { data } = useTeam();
  const teamMembers = data?.docs || [];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <AnimatedSection className="mt-36 !font-clash">
      <CommonTitle title={t("team")} />

      {/* Mobile View */}
      <div className="sm:hidden overflow-x-auto -mx-4 px-4 no-scrollbar scroll-smooth scroll-snap-x mandatory">
        <div className="flex gap-4 w-max">
          {teamMembers.map((member, index) => {
            const image = member.images.find((img) => img.type === "image")?.image?.url;
            return (
              <div
                key={index}
                className="flex-shrink-0 w-[70vw] max-w-[300px] flex flex-col scroll-snap-start"
              >
                <img
                  src={image || "/images/placeholder.png"}
                  alt={member.name}
                  className="w-full rounded-[20px] object-cover mb-3"
                />
                <div className="flex flex-col items-start">
                  <h3 className="text-2xl font-semibold uppercase text-site-dark-font">
                    {member.name}
                  </h3>
                  <p className="text-sm text-site-gray-font">
                    {member.designs} Designs
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:grid sm:grid-cols-3 w-full gap-4">
        {teamMembers.map((member, index) => {
          const image = member.images.find((img) => img.type === "image")?.image?.url;
          const hoverGif = member.images.find(
            (img) =>
              img.type === "video" &&
              img.image?.mimeType === "image/gif"
          )?.image?.url;

          return (
            <div
              key={index}
              className="flex flex-col group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="w-full aspect-[440/466] rounded-[20px] overflow-hidden relative">
                {/* Static Image */}
                <img
                  src={image || "/images/placeholder.png"}
                  alt={member.name}
                  className={`w-full h-full object-cover rounded-[20px] transition-opacity duration-300 ${
                    hoverGif ? "group-hover:opacity-0" : ""
                  }`}
                />
                {/* GIF on hover */}
                {hoverGif && hoveredIndex === index && (
                  <img
                    key={Date.now()} // Force reload every time
                    src={hoverGif}
                    alt={`${member.name} hover`}
                    className="absolute inset-0 w-full h-full object-cover rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </div>
              <div className="flex flex-col items-start mt-3">
                <h3 className="text-2xl font-semibold uppercase text-site-dark-font">
                  {member.name}
                </h3>
                <p className="text-sm text-site-gray-font">
                  {member.designs} Designs
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </AnimatedSection>
  );
};

export default Team;
