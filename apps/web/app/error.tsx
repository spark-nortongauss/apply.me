'use client';

type GlobalErrorProps = {
  error?: { message?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <main style={{ padding: 24 }}>
      <h1>Something went wrong</h1>
      <p>{error?.message}</p>
      <button onClick={() => reset()}>Retry</button>
    </main>
  );
}
