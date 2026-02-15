'use client'
import Header from '../components/layout/Header';
import Hero from '../components/home/Hero';
import DescriptionSection from '../components/home/DescriptionSection';
import TextType from '@/components/TextType';
import { Footer } from '@/components/layout/Footer';
import PackagesSection from '@/components/home/PackagesSection';
import FractalStorySection from '@/components/home/FractalStorySection';
import FAQSection from '@/components/home/FAQSection';

import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import TeamSection from '@/components/home/TeamSection';
import Solution from '@/components/home/Solution';

export default function Home() {
  return (
    <div className="min-h-screen max-w-screen overflow-x-clip font-sans selection:bg-brand-violet-soft selection:text-action-primary bg-bg-page text-text-main">
      <ScrollIndicator />
      <Header />
      <Hero />
      <FractalStorySection />

      <Solution />

      <div id='description'>
        <TextType
          typingSpeed={20}
          pauseDuration={500}
          showCursor
          cursorCharacter="●"
          text={[
            "From startups",
            "to scale-ups",
            "to enterprises",
            "BaseLex is the compliance control plane",
            "that turns policy into executable constraints",
            "and keeps every workflow audit-ready",
          ]}

          deletingSpeed={20}
          cursorBlinkDuration={0.5}
          className='text-2xl md:text-5xl font-bold px-10 md:px-20 my-20 uppercase'
        />
        <DescriptionSection
          baseOpacity={0.01}
          enableBlur
          baseRotation={6}
          blurStrength={20}
          containerClassName='min-h-[70vh] px-8'
        >
          BaseLex is a multi-agent compliance platform that turns laws, regulations, and internal policies into executable constraints—then enforces them at runtime across workflows, automations, and AI outputs.
          In short: BaseLex doesn’t sell “agents.” It sells the compliance control plane that governs every agent and high-risk workflow, producing audit-grade, traceable decisions by default.
        </DescriptionSection>
      </div>

      <PackagesSection />

      <TeamSection />

      <FAQSection />
      <Footer />

    </div>
  );
}
