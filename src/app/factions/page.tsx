import Image from "next/legacy/image";
import Layout from "../ui/layout";
import RaceCard from "../ui/race-card";
import { BackgroundImage } from "../ui/background-image";
export default function Factions() {
  return (
    <Layout>
      <BackgroundImage
        altText="Background - a pencil stlye drawing of a medieval battle"
        imageSrc={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/battle_background.webp`}
      />
      <div className="items-center text-center">
        <h1 className="mb-6 text-3xl text-ink">
          Races and Factions of Zalantha
        </h1>
        <RaceCard
          imageUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/ork_thumbnail.webp`}
          altText="A growling ork"
          title="Orks"
          content="Orks inhabit desert regions, living in tents made from the hides of
          animals. They are a warring faction, always in search of the next
          great battle. They worship the Red Sun and believe that, depending on
          their kill count at death, they will ascend to the highest heavens,
          where they will fight great beasts for all eternity."
        />
        <RaceCard
          imageUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/dwarf_thumbnail.webp`}
          invertedImagePos
          altText="A stout dwarf with antlers looking towards the camera"
          title="Dwarves"
          content="The Dwarves are humble miners who dwell in carved huts on the sides of
          the very mountains they mine. They collect jewels and precious metals,
          creating great weapons and jewelry from their finds. Dwarves love to
          celebrate after a hard day's work, hosting grand feasts as a large
          clan."
        />
        <RaceCard
          imageUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/beastfolk.webp`}
          altText="A male minotour looking towards the camera"
          title="Beastfolk"
          content="Beastfolk have no land to call their own. Other factions view them as
          evil due to their appearance, forcing them to live as exiles,
          struggling to survive in a cruel and unforgiving world."
        />
        <RaceCard
          imageUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/human.webp`}
          invertedImagePos
          altText="A man in flowing black robes with a ball of fire flaoting in front of him"
          title="Humans"
          content="Humans have established villages and congregate together for safety,
          maintaining a sense of community in this harsh land. Their dialects
          and cultures can vary significantly."
        />
        <RaceCard
          imageUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/faefolk.webp`}
          altText="A famle fairy with pixie wings faces the camera"
          title="Faefolk"
          content="The Faefolk reside deep in the woods, making their homes in trees,
          bushes, and near ponds. The most playful of all the factions, Faefolk
          are known to be pranksters. Their culture revolves around freedom in
          the forest and living in harmony with the animals."
        />
        <RaceCard
          imageUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/elf_thumbnail.webp`}
          invertedImagePos
          altText="A femal elf in plate armor with flowing blonde hair"
          title="Elves"
          content="Elves, who also love the forest, build their huts high in the trees to
          avoid predators. Living the longest among the factions, they prefer to
          take life slowly, savoring every moment. Elves are keen on learning
          about the world and dedicate themselves to its study."
        />
      </div>
    </Layout>
  );
}
