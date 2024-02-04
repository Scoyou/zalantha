import Layout from "../ui/layout";
import { ComingSoon } from "../ui/coming-soon";
import { BackgroundImage } from "../ui/background-image";

export default function CharacterSheet() {
  return (
    <Layout>
      <BackgroundImage
        altText="Background - a pencil drawing of a castle"
        imageSrc="https://d1ta48eu7x3n0t.cloudfront.net/character_sheet_background.webp"
      />
      <ComingSoon />
    </Layout>
  );
}
