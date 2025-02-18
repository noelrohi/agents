import { db } from "@/db";
import { notFound } from "next/navigation";
import EditForm from "./form";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;
  const item = await db.query.items.findFirst({
    where: (table, { eq }) => eq(table.id, Number.parseInt(id)),
  });
  if (!item) {
    return notFound();
  }
  return <EditForm item={item} id={Number.parseInt(id)} />;
}
