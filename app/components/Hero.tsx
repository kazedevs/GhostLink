

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center pt-32 pb-24 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-black dark:text-white">
          GhostLink!
        </h1>
        
        <p className="text-md md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
          Messages are encrypted, rooms expire automatically, and no personal profiles are ever created.
        </p>
      </div>
    </section>
  );
};
