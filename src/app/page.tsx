import { Header } from "./ui/header";
import Card from "./ui/card";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <main>
      <section className="relative">
        <Header />
        <div className="relative z-20 -mt-6 px-4 pb-16 md:-mt-16 md:px-6">
          <div className="surface-panel ornate-frame mx-auto w-full max-w-6xl rounded-2xl px-4 py-8 md:rounded-[36px] md:px-10 md:py-10">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="animate-rise-in" style={{ animationDelay: "0.05s" }}>
                <Card
                  imageUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/rules_background.webp`}
                  title="Rules"
                  subText="The rules of the game are as follows..."
                  buttonText="Read More"
                  buttonHref="/rules"
                />
              </div>
              <div className="animate-rise-in" style={{ animationDelay: "0.15s" }}>
                <Card
                  imageUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/history_thumbnail.webp`}
                  title="World History"
                  subText="This is the creation story of the world in which our LARPing adventure takes place..."
                  buttonText="Read More"
                  buttonHref="/history"
                />
              </div>
              <div className="animate-rise-in" style={{ animationDelay: "0.25s" }}>
                <Card
                  imageUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/zalantha_map.jpeg`}
                  title="Races and Factions"
                  subText="The Races and factions that populate the realm of Zalantha..."
                  buttonText="Read More"
                  buttonHref="/factions"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-6">
        <div className="surface-panel surface-panel--deep ornate-frame about-panel relative z-10 mx-auto w-full max-w-5xl rounded-2xl px-5 py-10 text-center animate-rise-in md:rounded-[32px] md:px-8 md:py-12">
          <h1 className="text-3xl text-ink">About Us</h1>
          <p className="mt-4 text-sm leading-relaxed text-ink/85 md:text-base">
            We are a high-fantasy Live Action Role Play (LARP) game based in
            Davis County, Utah. What is LARP? Well, I&apos;m here to tell you.
            Did you ever play pretend when you were younger? Did you pretend to
            be a ninja, knight, or maybe even pretend to fight monsters? LARP is
            like that, but for adults and with some rules. It&apos;s almost like
            playing a roleplaying game, but you become the character. Have you
            ever played D&D and wanted to do more than just roll the dice? With
            LARP, you can do just that.
          </p>
          <Link href="/get-started" className="btn-primary mt-6 inline-flex text-xs uppercase tracking-[0.3em]">
            Get Started
          </Link>
        </div>
      </section>

      <section className="px-4 pb-20 md:px-6">
        <div className="relative mx-auto h-[34rem] w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl md:rounded-[36px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/header_image.webp`}
            alt="Background"
            layout="fill"
            objectFit="cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/10 to-mist/70"></div>
          <div className="absolute inset-0 flex items-end justify-start p-8 md:p-12">
            <div className="surface-panel ornate-frame rounded-2xl px-4 py-4 text-left animate-fade-in md:rounded-[24px] md:px-6 md:py-5">
              <h1 className="text-2xl text-ink md:text-3xl">Upcoming Events</h1>
              <p className="mt-2 text-sm text-ink/85 md:text-base">
                Stay tuned for events coming up in 2025!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
