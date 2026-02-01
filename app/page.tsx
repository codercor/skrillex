'use client'
import React from 'react';
import Image from 'next/image';
import Header from '../components/layout/Header';
import Hero from '../components/home/Hero';
import LottieSection from '../components/home/LottieSection';
import DescriptionSection from '../components/home/DescriptionSection';
import Carousel from '../components/home/Carousel';
import TextType from '@/components/TextType';
import { Globe } from '@/components/ui/globe';
import { Connection } from '@/components/home/Connection';
import { Footer } from '@/components/ui/modem-animated-footer';
import { Github, Linkedin, Mail, NotepadTextDashed, Twitter } from 'lucide-react';
import FinalCTA from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <div className="min-h-screen max-w-screen overflow-x-clip font-sans selection:bg-brand-violet-soft selection:text-action-primary bg-bg-page text-text-main">
      <Header />

      <Hero />

      <Connection />
      <Carousel />
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
          baseRotation={12}
          blurStrength={30}
          containerClassName='min-h-[59vh] px-8'
        >

          BaseLex is a multi-agent compliance platform that turns laws, regulations, and internal policies into executable constraints—then enforces them at runtime across workflows, automations, and AI outputs.

          In short: BaseLex doesn’t sell “agents.” It sells the compliance control plane that governs every agent and high-risk workflow, producing audit-grade, traceable decisions by default.

        </DescriptionSection>
      </div>
      <LottieSection />

      <FinalCTA />

      <Footer
        brandName="BaseLex"
        brandDescription="BaseLex is a multi-agent compliance platform that turns laws, regulations, and internal policies into executable constraints—then enforces them at runtime across workflows, automations, and AI outputs."
        socialLinks={[
          {
            icon: <Twitter className="w-6 h-6" />,
            href: "https://twitter.com",
            label: "Twitter",
          },
          {
            icon: <Linkedin className="w-6 h-6" />,
            href: "https://linkedin.com",
            label: "LinkedIn",
          },
          {
            icon: <Github className="w-6 h-6" />,
            href: "https://github.com",
            label: "GitHub",
          },
          {
            icon: <Mail className="w-6 h-6" />,
            href: "https://mail.com",
            label: "Email",
          },
        ]}
        navLinks={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "About",
            href: "/about",
          },
          {
            label: "Contact",
            href: "/contact",
          },
        ]}
        creatorName="BaseLex"
        creatorUrl="https://baselex.com"
        brandIcon={<Image src="/logo-mor.svg" alt="BaseLex" width={40} height={40} className="object-contain" />}
      />
    </div>
  );
}
