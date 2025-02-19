import UpsertAgentForm from "@/components/forms/upsert-agent";
import { newFlag } from "@/flags";
import { notFound } from "next/navigation";

export default async function NewPage() {
  const canCreateNew = await newFlag();
  if (!canCreateNew) {
    return notFound();
  }
  return <UpsertAgentForm item={null} id={null} />;
}
