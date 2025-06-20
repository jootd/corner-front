"use client";
import Title from "@/components/common/Title";
import { useParams, usePathname } from "next/navigation";
import PageFade from "@/components/common/PageFade";
import useProjects from "@/hooks/api/useProjects";
import Image from "next/image";

const Page = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useProjects();

  if (isLoading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  if (isError || !data?.docs) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load projects
      </div>
    );
  }

  const project = data.docs.find((p) => p.id.toString() === id);

  if (!project) {
    return (
      <div className="text-center py-20 text-red-500">Project not found</div>
    );
  }

  const image = project.images?.[0]?.image;
  const service = project.services?.[0];

  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  return (
    <PageFade>
      <div className="!font-clash mx-auto py-10">
        <Title title={project.title} backHref={`/${currentLocale}/work`} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Left side: Service */}
          <div className="flex flex-col items-start text-site-dark-font uppercase">
            <p className="text-site-dark-font text-2xl font-semibold mb-3">
              Service
            </p>
            <h2 className="px-6 py-[18px] rounded-xl font-semibold transition border border-[#CDCDCD]">
              {service?.title || "Unknown"}
            </h2>
          </div>

          {/* Right side: About */}
          <div>
            <p className="text-site-dark-font text-2xl font-semibold mb-3 uppercase">
              About
            </p>
            <p className="text-site-gray-font font-medium">{project.desc}</p>
          </div>
        </div>

        {/* Bottom image */}
        <div className="flex flex-wrap gap-6">
          {project.images
            ?.filter((item) => item.image.alt !== "thumbnail") // skip thumbnails
            .map((item) => {
              const { mimeType, url, alt, width, height } = item.image;
              const isVideo = mimeType?.startsWith("video");
              const mediaWidth =
                item.metadata === "1"
                  ? "w-full"
                  : item.metadata === "1/2"
                  ? "w-1/2"
                  : "w-full"; // fallback to full width

              return (
                <div key={item.id} className={`${mediaWidth}`}>
                  {isVideo ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="rounded-2xl w-full max-h-[600px] object-cover"
                      src={url}
                    />
                  ) : (
                    <Image
                      src={url}
                      alt={alt || "Project media"}
                      width={width || 1200}
                      height={height || 600}
                      className="rounded-2xl w-full max-h-[600px] object-cover"
                      unoptimized
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </PageFade>
  );
};

export default Page;
