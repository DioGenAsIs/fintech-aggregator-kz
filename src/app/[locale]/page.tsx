import offers from "@/data/offers.json";
import { getMessages } from "@/lib/messages";
import { LandingPage } from "@/components/landing/LandingPage";

export default function RootPage() {
  const messages = getMessages("kk");
  return <LandingPage locale="kk" messages={messages} offers={offers} />;
}
