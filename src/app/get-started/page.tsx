import Image from "next/image";
import { BackgroundImage } from "../ui/background-image";
import Layout from "../ui/layout";
import Link from "next/link";
export default function GetStarted() {
  return (
    <Layout>
      <BackgroundImage
        altText="Background - a tomb with egyptian statues in front of it"
        imageSrc="https://d1ta48eu7x3n0t.cloudfront.net/getting_started_background.webp"
      />
      <div className="items-center text-center">
        <Image
          src="https://d1ta48eu7x3n0t.cloudfront.net/tome_getting_started.webp"
          alt="A photo of a scroll"
          className="mx-auto mb-4 w-80 h-80 object-contain"
          width={400}
          height={400}
          priority
        />
        <h1 className="text-2xl font-bold mb-2">Get Started</h1>
      </div>

      <p>
        Introduction to LARP: So, you want to LARP? First things first: What is
        LARP? Well, I&apos;m here to tell you. Did you ever play pretend when
        you were younger? Did you pretend to be a ninja, knight, or maybe even
        pretend to fight monsters? LARP is like that, but for adults and with
        some rules. It&apos;s almost like playing a roleplaying game, but you
        become the character. Have you ever played D&D and wanted to do more
        than just roll the dice? With LARP, you can do just that. On this page,
        we will explore the world we will be playing in, the rules, and
        character creation if you need assistance.
      </p>
      <p>
        Our adventure takes place in the world of Zalantha. A newly developed
        realm full of magic. You can learn more about the creation of our world
        on the{" "}
        <Link className="text-orange-900 hover:underline" href="/history">
          World History page
        </Link>
      </p>
      <Image
        src="https://d1ta48eu7x3n0t.cloudfront.net/zalantha_map.jpeg"
        alt="A map of Zalantha"
        className="mx-auto mb-4 lg:w-2/5 lg:h-2/5 object-contain w-80 h-80"
        width={400}
        height={400}
      />
      <p>
        The first step to getting started is to create a character using a race
        and class that you like.
      </p>
      <strong>Races</strong>
      <p>
        <strong>Orks:</strong> These big brutes are the most barbaric of the
        factions. War is what they crave. Orks are always looking for a good
        fight. Players portraying Orks will paint themselves green and will
        usually have tusks. Orks love to wear war paint, so have fun and get
        creative with it.
      </p>
      <p>
        <strong>Dwarves:</strong> This faction comprises miners and are the
        greatest builders in the world. Unlike Dwarves in other media, these
        Dwarves have ram horns growing out of their heads. The Dwarves have
        great beards, and of course, the main feature of this world's Dwarves
        are their ram horns, which they decorate with paint.
      </p>
      <p>
        <strong>Elves:</strong> These Elves are one of the most magical races in
        the world. They have hints of blue on their skin. Elf players will have
        pointy ears and use blue makeup to lightly apply the blue around their
        skin.
      </p>
      <p>
        <strong>Humans:</strong> One of the most common races in the land of
        Zalantha. Humans have a variety of ways they can dress and do not have
        any key physical features like the other factions.
      </p>
      <p>
        <strong>Beastfolk:</strong> This faction has evolved from different
        animals. They could be Minotaurs, wolf men, centaurs, etc. The key for
        players to dress as this race is to combine animal features with human
        features.
      </p>
      <p>
        <strong>Faefolk:</strong> The race of the Faefolk comes from a place
        where wild magic essentially lives. The Faefolk have a lot of color to
        their skin and costumes. Some Faefolk have wings, while some may have
        long, silly antennas. Have fun with this— the crazier, the better.
      </p>
      <p>
        You can find more details on each race on the{" "}
        <Link className="text-orange-900 hover:underline" href="/factions">
          Factions page.
        </Link>
      </p>
      <strong>Classes</strong>
      <p>
        <strong>Fighter:</strong> This class is the quintessential melee
        archetype. Knights, barbarians, archers, and monks are among the
        fighters from which you can draw inspiration. Fighters are capable of
        using any weapon in the game.
      </p>
      <p>
        <strong>Rogue:</strong> These are your stealthy operatives. Inspiration
        for rogues can come from thieves, ninjas, assassins, pirates, and
        rangers. If a rogue successfully backstabs another player, it counts as
        double the points. Rogues can use short bows, crossbows, daggers, and
        smaller swords.
      </p>
      <p>
        <strong>Mage:</strong> Mages in this world have a strong affinity for
        magic and are users of the arcane. Inspirations for this class include
        wizards who learned magic through books, sorcerers born with magic, and
        warlocks who made pacts with entities for their magic. Mages' weapons
        include staffs, wands, and daggers.
      </p>
      <p>
        <strong>Bard:</strong> The entertainers of the world, bards are
        storytellers, musicians, and writers who create art inspired by the
        world around them. They possess bardic immunity because their role is
        not to fight but to spin tales. A bard may carry a dagger but is not
        typically combative.
      </p>
      <p>
        <strong>War Priest:</strong> This class serves as the healers and
        supporters on the battlefield. Their focus is on slinging healing and
        support spells. War Priests are proficient in using maces, axes, and
        swords, usually accompanied by a shield.
      </p>
      <p>
        Once you have your character created, be sure to review the rules on the{" "}
        <Link href="/rules" className="text-orange-900 hover:underline">
          Rules page
        </Link>
        , Then join us for your first event! Have questions? Fill out our{" "}
        <Link href="/contact" className="text-orange-900 hover:underline">
          Contact Form
        </Link>{" "}
        and we'll get back to you ASAP.
      </p>
    </Layout>
  );
}
