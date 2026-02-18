"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="section-shell py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Something went wrong</p>
      <h1 className="mt-4 text-4xl font-bold text-primary">We hit an unexpected error</h1>
      <p className="mt-4 text-text/80">Please retry the action or return to the homepage.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-md bg-secondary px-4 py-2 font-semibold text-primary"
      >
        Try again
      </button>
    </main>
  );
}
