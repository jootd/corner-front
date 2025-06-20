"use client";

import PageFade from "@/components/common/PageFade";
import Title from "@/components/common/Title";
import useLocations from "@/hooks/api/useLocations";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Page = () => {
  const { data: locations } = useLocations();

  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  return (
    <PageFade>
      <Title title="3D LED Billboards" backHref={`/${currentLocale}`} />
      <div className="lg:py-8 lg:space-y-15 space-y-8">
        {locations?.docs?.map((service) => {
          const image = service.images?.[0]?.image;
          const imageUrl = image?.url;

          return (
            <div
              key={service.id}
              className="flex flex-col lg:flex-row justify-between items-start border-b border-gray-200 lg:py-10"
            >
              {/* Left Side: Text */}
              <motion.a
                className="flex flex-col space-y-1 lg:w-2/3 w-full cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.4 }}
                href={service.address_link}
                target="_blank"
              >
                <h1 className="lg:text-[56px] text-2xl font-semibold !font-clash text-site-dark-font uppercase">
                  {service.title}
                </h1>
                <p className="text-site-gray-font lg:text-xl">{service.address}</p>
              </motion.a>

              {/* Right Side: Optimized Image */}
              {imageUrl && (
                <motion.div
                  className="lg:w-1/3 w-full lg:mt-0 mt-5"
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.4 }}
                >
                  <Image
                    src={`${imageUrl}?w=800&quality=70`}
                    alt={image?.alt || service.title}
                    width={800} 
                    height={500} 
                    className="rounded-2xl object-cover w-full h-auto"
                    quality={70}
                  />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </PageFade>
  );
};

export default Page;
