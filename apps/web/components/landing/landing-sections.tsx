'use client';

import dynamic from "next/dynamic";

/**
 * This component loads browser-only landing UI (GSAP / Three / animations)
 * and disables SSR safely.
 */
const LandingSectionsContent = dynamic(
  () =>
    import("@/components/landing/landing-sections-content").then(
      (mod) => mod.LandingSectionsContent
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full py-32 text-center text-gray-500">
        Loading experience…
      </div>
    ),
  }
);

export default function LandingSectionsClient() {
  return <LandingSectionsContent />;
}
