import { CategoryPage } from "@/components/category-page";
import { getCategorizedItems } from "@/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agents Directory",
};

export default async function Page() {
  const agents = await getCategorizedItems("agent");
  return <CategoryPage categories={agents} />;
}
