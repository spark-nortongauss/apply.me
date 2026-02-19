"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

const CareerNetworkHero = dynamic(
  () => import("@/components/three/career-network-hero").then((mod) => mod.CareerNetworkHero),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

const sections = [
  "Problem: Job search underestimates human potential.",
  "How Pathfinder works: dynamic Career Intelligence Profile + Career Vector Score.",
  "AI demo: resume rewriting, ATS optimization, and fit-gap diagnostics.",
  "Candidate stories: users moving from overlooked to hired.",
  "Recruiter benefits: ranked candidates by success probability.",
  "Pricing: free intelligence layer + premium copilots and recruiter tools."
];

const navItems = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#stories", label: "Stories" },
  { href: "#recruiters", label: "Recruiters" },
  { href: "#pricing", label: "Pricing" }
];

export function LandingSectionsContent() {
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
      <header className="sticky top-0 z-40 border-b border-secondary/20 bg-background/95 backdrop-blur">
        <div className="section-shell flex h-16 items-center justify-between">
          <a href="#top" className="text-lg font-semibold text-primary">
            Pathfinder
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text/80 transition hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      <section id="top" className="section-shell grid gap-8 pt-4 lg:grid-cols-2 lg:items-center">
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

      <section id="how-it-works" className="section-shell grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <motion.div
            key={section}
            className="reveal"
            whileHover={{ y: -4 }}
            id={
              section.startsWith("Candidate stories")
                ? "stories"
                : section.startsWith("Recruiter benefits")
                  ? "recruiters"
                  : section.startsWith("Pricing")
                    ? "pricing"
                    : undefined
            }
          >
            <Card className="h-full border-secondary/20">
              <p className="text-lg font-medium text-primary">{section}</p>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
