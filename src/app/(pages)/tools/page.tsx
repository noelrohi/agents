import { CategoryPage } from "@/components/category-page";
import { getCategorizedItems } from "@/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools Directory",
};

export default async function Page() {
  const tools = await getCategorizedItems("tool");
  return <CategoryPage categories={tools} />;
}
