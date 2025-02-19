import UpsertAgentForm from "@/components/forms/upsert-agent";
import { getItem } from "@/data";
import { notFound } from "next/navigation";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;
  const item = await getItem(Number.parseInt(id));
  if (!item) {
    return notFound();
  }
  return <UpsertAgentForm item={item} id={Number.parseInt(id)} />;
}
