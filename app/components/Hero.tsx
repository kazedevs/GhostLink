

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center pt-32 pb-24 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-white">
          GhostLink!
        </h1>
        
        <p className="text-md md:text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
          Files are encrypted, automatically deleted after 24 hours, and no personal profiles are ever created.
        </p>
      </div>
    </section>
  );
};
