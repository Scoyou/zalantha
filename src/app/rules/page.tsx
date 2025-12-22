import Image from "next/legacy/image";
import Layout from "../ui/layout";
import { BackgroundImage } from "../ui/background-image";
export default function Rules() {
  return (
    <Layout>
      <BackgroundImage
        imageSrc={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/contact_us_background.webp`}
        altText="Background - a pencil drawing of people on horseback riding away from a castle"
      />
      <div className="items-center text-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/rules_background.webp`}
          alt="A photo of a scroll"
          className="mx-auto mb-6 h-72 w-72 object-contain md:h-80 md:w-80"
          width={400}
          height={400}
        />
        <h1 className="text-3xl text-ink">Rules</h1>
      </div>

      <p>
        <strong>Rules at a glance:</strong> <br /> This LARP uses a point-based
        system. Each player starts with 5 HP at Level 1. With each level gained,
        players receive an additional 2 HP, up to a maximum of Level 12 with 24
        HP. Players level up at least once after each event.
      </p>
      <p className="mt-4">
        <strong>Here&apos;s how the point system works:</strong> <br />
        Each limb hit counts as one point, while a chest hit counts as two
        points. Intentional head hits are strictly prohibited; doing so will
        result in disqualification and prevent leveling up from the event. Only
        foam weapons are allowed, and they must be inspected by a Game Master
        upon arrival.
      </p>
      <p className="mt-4">
        <strong>Rules of Magica:</strong>
        <br /> The magic in this world is categorized into two types: Divine and
        Arcane. Divine Magic is primarily supportive, including abilities like
        healing and shielding. This form of magic is typically used by
        Warpriests. Arcane Magic is offensive, encompassing elemental magics
        like Fireball or Lightning Bolt, commonly wielded by Mages. Magic usage
        involves rolling a large D20 to determine success or failure.
      </p>
      <p className="mt-4">
        <strong>Spellcasting rules are as follows:</strong> <br /> At Level 1,
        players receive one spell, which can be used once per game. With each
        level-up, players can either acquire an additional spell or increase
        their existing spell&apos;s level. As a spell&apos;s level increases,
        its Difficulty Rating (DR) goes up by 2.
      </p>
    </Layout>
  );
}
