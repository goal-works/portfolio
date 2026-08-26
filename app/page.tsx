import { AboutPreview } from "@/components/home/about-preview";
import { AiEvaluation } from "@/components/home/ai-evaluation";
import { Contact } from "@/components/home/contact";
import { Expertise } from "@/components/home/expertise";
import { Hero } from "@/components/home/hero";
import { ProfessionalWork } from "@/components/home/professional-work";
import { SelectedWork } from "@/components/home/selected-work";
import { Technology } from "@/components/home/technology";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <SelectedWork />
      <AiEvaluation />
      <Expertise />
      <ProfessionalWork />
      <AboutPreview />
      <Technology />
      <Contact />
    </main>
  );
}
