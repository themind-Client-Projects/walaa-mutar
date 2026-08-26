import type { Metadata } from "next";

import { ServicesPage } from "@/components/sections/services-page";
import { servicesPageIntro } from "@/content/services";

export const metadata: Metadata = {
  title: `${servicesPageIntro.title} — Walaa Mutar`,
  description: servicesPageIntro.lede,
  openGraph: {
    title: servicesPageIntro.title,
    description: servicesPageIntro.lede,
  },
};

export default function Page() {
  return <ServicesPage />;
}
