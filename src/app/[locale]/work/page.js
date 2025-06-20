"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Title from "@/components/common/Title";
import { usePathname } from "next/navigation";
import PageFade from "@/components/common/PageFade";
import { AnimatePresence, motion } from "framer-motion";
import useServices from "@/hooks/api/useServices";
import useProjects from "@/hooks/api/useProjects";
import Image from "next/image";
import { useTranslations } from "use-intl";

const Page = () => {
  const { data: servicesData } = useServices();
  const { data: projects } = useProjects();
  const  t = useTranslations("HomePage")

  const [selectedCategory, setSelectedCategory] = useState("All");

  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];


  const serviceTitles = useMemo(() => {
    if (!servicesData?.docs) return [];
    return servicesData.docs.map((s) => s.title);
  }, [servicesData]);

  const categories = useMemo(() => {
    return ["All", ...serviceTitles];
  }, [serviceTitles]);

  const formattedProjects = useMemo(() => {
    if (!projects?.docs) return [];

    return projects.docs.map((project) => {
      const image = project.images.find((img) => img.image.alt === "thumbnail");
      const category = project.services?.[0]?.title || "Uncategorized";

      return {
        id: project.id,
        title: project.title,
        desc: project.desc,
        category,
        image: image?.image.url || "",
      };
    });
  }, [projects]);

  const filteredProjects =
    selectedCategory === "All"
      ? formattedProjects
      : formattedProjects.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

        
  return (
    <PageFade>
      <div className="!font-clash px-[1px]">
        <Title title={t("projects")} backHref={`/${currentLocale}`} />

        {/* Category filter buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          {categories.map((cat) => (
            <h2
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-[18px] rounded-xl font-semibold transition border border-[#CDCDCD] uppercase cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#26292D] text-white"
                  : "bg-transparent text-site-dark-font"
              }`}
            >
              {cat}
            </h2>
          ))}
        </div>

        {/* Animated Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`${pathname}/${project.id}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500} // or exact width/height
                    height={300}
                    className="w-full sm:h-[300px] lg:h-[466px] object-cover rounded-2xl mx-auto"
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg" // optional: low-res preview or local shimmer
                  />
                  <div className="mt-4 text-left">
                    <h3 className="text-[32px] font-semibold text-site-dark-font uppercase">
                      {project.title}
                    </h3>
                    <p className="text-site-gray-font mt-1 line-clamp-2">{project.desc}</p>
                    </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageFade>
  );
};

export default Page;
