import offers from "@/data/offers.json";
import { LandingPage } from "@/components/landing/LandingPage";
import { getMessages } from "@/lib/messages";

export default function RootPage() {
  return <LandingPage locale="kk" messages={getMessages("kk")} offers={offers} />;
}
