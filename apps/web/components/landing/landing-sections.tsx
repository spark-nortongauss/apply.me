import dynamic from "next/dynamic";

const LandingSectionsContent = dynamic(
  () => import("@/components/landing/landing-sections-content").then((mod) => mod.LandingSectionsContent),
  { ssr: false }
);

export function LandingSections() {
  return <LandingSectionsContent />;
}
