import type { Metadata } from "next";

import { ServicesPage } from "@/components/sections/services-page";
import { services, servicesPageIntro } from "@/content/services";

const [firstService] = services;

export const metadata: Metadata = {
  title: servicesPageIntro.title,
  description: servicesPageIntro.lede,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    title: servicesPageIntro.title,
    description: servicesPageIntro.lede,
    images: [
      {
        url: firstService.image.src,
        width: firstService.image.width,
        height: firstService.image.height,
        alt: firstService.image.alt,
      },
    ],
  },
};

export default function Page() {
  return <ServicesPage />;
}
