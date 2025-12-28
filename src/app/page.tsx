import { SpotlightSearch } from "@/components/spotlight/SpotlightSearch";
import { Background } from "@/components/layout/Background";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 overflow-hidden">
      <Background />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
            Ronit Kumar
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            Frontend & Full Stack Developer
          </p>
        </div>

        <SpotlightSearch />

        <div className="mt-12 flex gap-6 text-sm text-muted-foreground/60">
          <p>Press <kbd className="font-sans px-1.5 py-0.5 rounded bg-muted/20 border border-white/5">⌘K</kbd> to search</p>
        </div>
      </div>

      <footer className="absolute bottom-6 text-xs text-muted-foreground/40">
        Based in Ranchi • Open to Remote
      </footer>
    </main>
  );
}
