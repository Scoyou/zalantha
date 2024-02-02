import Image from "next/image";
import { BackgroundImage } from "../ui/background-image";
export default function GetStarted() {
  return (
    <div className="flex flex-col p-4 bg-parchment min-h-screen bg-opacity-10 relative">
      <BackgroundImage
        altText="Background - a tomb with egyptian statues in front of it"
        imageSrc="https://zalantha-prod-public.s3.us-east-2.amazonaws.com/getting_started_background.webp"
      />
      <div className="flex items-center justify-center min-h-screen z-10">
        <div className="flex flex-col items-center justify-center shadow-lg bg-amber-100 border border-amber-600 bg-opacity-70 w-full md:w-3/4 p-4 space-y-4">
          <div className="items-center text-center">
            <Image
              src="https://zalantha-prod-public.s3.us-east-2.amazonaws.com/tome_getting_started.webp"
              alt="A photo of a scroll"
              className="mx-auto mb-4 w-80 h-80 object-contain"
              width={400}
              height={400}
              priority
            />
            <h1 className="text-2xl font-bold mb-2">Get Started</h1>
          </div>

          <p>
            Introduction to LARP: So, you want to LARP? First things first: What
            is LARP? Well, I&apos;m here to tell you. Did you ever play pretend
            when you were younger? Did you pretend to be a ninja, knight, or
            maybe even pretend to fight monsters? LARP is like that, but for
            adults and with some rules. It&apos;s almost like playing a
            roleplaying game, but you become the character. Have you ever played
            D&D and wanted to do more than just roll the dice? With LARP, you
            can do just that. On this page, we will explore the world we will be
            playing in, the rules, and character creation if you need
            assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
