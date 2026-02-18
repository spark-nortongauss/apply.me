"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CareerNetworkHero } from "@/components/three/career-network-hero";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  "Problem: Job search underestimates human potential.",
  "How Pathfinder works: dynamic Career Intelligence Profile + Career Vector Score.",
  "AI demo: resume rewriting, ATS optimization, and fit-gap diagnostics.",
  "Candidate stories: users moving from overlooked to hired.",
  "Recruiter benefits: ranked candidates by success probability.",
  "Pricing: free intelligence layer + premium copilots and recruiter tools."
];

export function LandingSections() {
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 80%" }
        }
      );
    });
  }, []);

  return (
    <div className="space-y-20 pb-20">
      <section className="section-shell grid gap-8 pt-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Pathfinder</p>
          <h1 className="mt-3 text-4xl font-bold text-primary lg:text-6xl">Career Intelligence for Human Potential.</h1>
          <p className="mt-5 max-w-xl text-lg text-text/80">
            Pathfinder analyzes your trajectory, quantifies your impact, and matches you to life-changing opportunities beyond keyword filters.
          </p>
          <div className="mt-8 flex gap-3">
            <Button>Start Free</Button>
            <Button variant="outline">Book Recruiter Demo</Button>
          </div>
        </div>
        <CareerNetworkHero />
      </section>

      <section className="section-shell grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <motion.div key={section} className="reveal" whileHover={{ y: -4 }}>
            <Card className="h-full border-secondary/20">
              <p className="text-lg font-medium text-primary">{section}</p>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
