'use client';

import dynamic from "next/dynamic";

const LandingSectionsContent = dynamic(
  () =>
    import("@/components/landing/landing-sections-content").then(
      (mod) => mod.LandingSectionsContent
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full py-20 text-center text-muted-foreground">
        Loading…
      </div>
    ),
  }
);

export default function LandingSectionsClient() {
  return <LandingSectionsContent />;
}
