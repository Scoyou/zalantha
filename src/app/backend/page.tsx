import type { Metadata } from "next";
import Layout from "../ui/layout-panel";
import BackendClient from "./BackendClient";

export const metadata: Metadata = {
  title: "Saved Characters | Knights of Zalantha",
  description: "View your saved Knights of Zalantha characters.",
};

export default function BackendPage() {
  return (
    <Layout>
      <BackendClient />
    </Layout>
  );
}
