import Image from "next/image";
import { BackgroundImage } from "../ui/background-image";
import Layout from "../ui/layout";

export default function History() {
  return (
    <Layout>
      <BackgroundImage
        altText="Background - two titans clashing"
        imageSrc="https://d1ta48eu7x3n0t.cloudfront.net/history_background.webp"
      />
      <div className="items-center text-center">
        <Image
          src="https://d1ta48eu7x3n0t.cloudfront.net/history_thumbnail.webp"
          alt="A photo of a scroll"
          className="mx-auto mb-4 w-80 h-80 object-contain"
          width={400}
          height={400}
          priority
        />
        <h1 className="text-2xl font-bold mb-2">History</h1>
      </div>

      <h2>
        <strong>World Creation</strong>
      </h2>
      <p>
        This is the creation story of the world in which our LARPing adventure
        takes place. It all began with the creation of the Titans. These mighty
        beings floated in space until Heloks, the most sinister of them all,
        stepped forward. He murdered Crylox, the water Titan. Crylox&apos;s
        blood coalesced, forming the world as a giant orb. The Titans, embroiled
        in conflict, tried to identify the culprit, but none suspected Heloks—at
        first. Tragedy struck again when Heloks killed Oranus, the sun Titan.
        The blood of the fallen Titan birthed one of the suns overhead.
        Oranus&apos; wife, Skantiva, succumbed to a broken heart, her demise
        giving rise to the red sun in the east. Eventually, Heloks&apos;
        treachery was uncovered, although he had already garnered a following
        among some Titans. In response, the heroic Titan Probux rallied the
        remaining Titans to oppose Heloks and his allies. They chose the
        newly-formed world as their battlefield, deeming it vast enough for
        their epic struggle. Over thousands of years, their battles raged,
        shaping the lands and mountains upon which we now tread. The conflict
        culminated in a fierce duel between Probux and Heloks. Their battle was
        intense, but ultimately, it ended in a draw. With his remaining
        strength, Probux imprisoned Heloks in a fortress at the world&apos;s
        heart. Wounded and weakened, Probux retreated beyond the world, where he
        eventually succumbed to his injuries. His blood transformed him into the
        moon, eternally circling the earth. Some believe Heloks perished long
        ago, but that, as they say, is a story for another time.
      </p>
      <br />
      <h2>
        <strong>How you fit into the world</strong>
      </h2>
      <p>
        Zalantha is a young, burgeoning realm. In the aftermath of the Titan
        War, various factions emerged. Each of these factions, humanoid in
        nature but distinct in myriad ways, began to navigate this new world.
        Striving to establish dominance, they engaged in both battles and
        diplomatic endeavors. As you embark on your journey in Zalantha, your
        actions—whether through combat or negotiation—will help you find your
        place in this nascent realm. Your choices and adventures will shape the
        future of Zalantha, forging a new destiny for this world.
      </p>
    </Layout>
  );
}
