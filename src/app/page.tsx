import type { Metadata } from "next";
import offers from "@/data/offers.json";
import { getMessages } from "@/lib/messages";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://tengimarket.kz/kk",
  },
};

export default function RootPage() {
  const messages = getMessages("kk");
  return <LandingPage locale="kk" messages={messages} offers={offers} />;
}
