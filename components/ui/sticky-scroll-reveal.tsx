"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newActiveCard = Math.min(
      Math.floor(latest * cardLength),
      cardLength - 1
    );
    setActiveCard(newActiveCard);
  });

  const backgroundGradients = [
    "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)", // Deep indigo gradient
    "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)", // Slate gradient
    "linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)", // Zinc gradient
    "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #6b21a8 100%)", // Indigo to purple gradient
    "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)", // Sky blue gradient
  ];
  const contentGradients = [
    "linear-gradient(135deg, #4F46E5 0%, #00F0FF 100%)", // Indigo to cyan
    "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)", // Indigo to purple
    "linear-gradient(135deg, #00F0FF 0%, #4F46E5 100%)", // Cyan to indigo
    "linear-gradient(135deg, #8b5cf6 0%, #00F0FF 100%)", // Purple to cyan
    "linear-gradient(135deg, #1e1b4b 0%, #4F46E5 100%)", // Deep indigo to indigo
  ];

  const [containerBackground, setContainerBackground] = useState(
    backgroundGradients[0],
  );

  useEffect(() => {
    setContainerBackground(backgroundGradients[activeCard % backgroundGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      style={{
        background: containerBackground,
      }}
      className="relative flex min-h-screen justify-center py-8  transition-all duration-500"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl ">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-52 h-[40vh]">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg mt-10 max-w-sm text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>
        <div className="h-[40vh]" />
      </div>
      <div
        style={{ background: contentGradients[activeCard % contentGradients.length] }}
        className={cn(
          "sticky top-80 hidden h-fit w-[40vh] overflow-hidden rounded-md bg-white lg:block transition-all duration-500",
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
