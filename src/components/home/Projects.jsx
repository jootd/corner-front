"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AnimatedSection from "../common/AnimatedSection";
import { useTranslations } from "next-intl";
import useProjects from "@/hooks/api/useProjects";

const Projects = () => {
  const { data: allProjects } = useProjects();
  const t = useTranslations("HomePage");
  const router = useRouter();

  const projects = useMemo(() => allProjects?.docs || [], [allProjects]);

  const [activeId, setActiveId] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  // Set the first project as active once data loads
  useEffect(() => {
    if (projects.length && !activeId) {
      setActiveId(projects[0].id);
    }
  }, [projects, activeId]);

  const getThumbnailImage = (project) =>
    project.images.find((img) => img.image?.alt === "thumbnail")?.image?.url;

  const displayedImage = useMemo(() => {
    const targetId = hoverId ?? activeId ?? projects[0]?.id;
    const project = projects.find((p) => p.id === targetId);
    return project ? getThumbnailImage(project) : "";
  }, [hoverId, activeId, projects]);

  const currentLang =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[1]
      : "en";

  if (!projects.length) return null;

  return (
    <AnimatedSection className="mt-36 !font-clash">
      <h1 className="text-site-dark-font mb-[60px] lg:text-[56px] text-2xl uppercase font-semibold">
        {t("projects")}
      </h1>

      {/* Mobile layout */}
      <div className="block lg:hidden space-y-8">
        {projects.slice(0, 6).map((project) => {
          const thumbnail = getThumbnailImage(project);
          return (
            <AnimatedSection
              key={project.id}
              className="flex flex-col text-site-dark-font uppercase font-semibold"
            >
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt={project.title}
                  className="w-full rounded-2xl object-cover mb-4"
                />
              )}
              <p className="text-sm">{project.services?.[0]?.title}</p>
              <h3 className="text-2xl">{project.title}</h3>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex gap-10 items-start" id="work">
        <div className="w-1/2 h-[600px]">
          {displayedImage && (
            <img
              src={displayedImage}
              alt="Project Visual"
              className="w-full h-full object-cover rounded-2xl transition-opacity duration-500 ease-in-out"
            />
          )}
        </div>

        <div className="w-1/2 flex flex-col gap-6 uppercase">
          {projects.slice(0, 6).map((project) => {
            const isActive = project.id === (hoverId ?? activeId ?? projects[0]?.id);
            return (
              <div
                key={project.id}
                className={`cursor-pointer transition-colors duration-200 ${
                  isActive
                    ? "text-site-dark-font font-semibold"
                    : "text-site-gray-font font-semibold"
                }`}
                onMouseEnter={() => setHoverId(project.id)}
                onMouseLeave={() => setHoverId(null)}
                onClick={() => setActiveId(project.id)}
              >
                <p className="text-sm opacity-80 uppercase">{project.services?.[0]?.title}</p>
                <h3 className="text-[32px] leading-tight">{project.title}</h3>
              </div>
            );
          })}

          <Link
            href={`/${currentLang}/work`}
            className="text-site-gray-font font-semibold leading-none mt-6 cursor-pointer"
          >
            <p className="text-sm opacity-80 uppercase">View all</p>
            <h3 className="text-[32px]">{projects.length}</h3>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Projects;
