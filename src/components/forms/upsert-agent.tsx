"use client";

import { autofillItem, createItem, updateItem } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getItem } from "@/data";
import { insertItemSchema } from "@/db/zod";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

interface EditPageProps {
  item: Awaited<ReturnType<typeof getItem>> | null;
  id: number | null;
}

export default function UpsertAgentForm({ item, id }: EditPageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof insertItemSchema>>({
    resolver: zodResolver(insertItemSchema),
    defaultValues: item
      ? {
          ...item,
          keybenefits: item.keybenefits ?? [],
          whoIsItFor: item.whoIsItFor ?? [],
          features: item.features ?? [],
        }
      : undefined,
  });

  async function onSubmit(values: z.infer<typeof insertItemSchema>) {
    try {
      startTransition(async () => {
        if (id) {
          await updateItem(id, values);
          router.push(`/a/${id}`);
        } else {
          const newItem = await createItem(values);
          router.push(`/a/${newItem.id}`);
        }
        router.refresh();
      });
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  }

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Item</CardTitle>
          <CardDescription>
            Make changes to the agent or tool information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="href"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter avatar URL"
                        onChange={onChange}
                        value={value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>Optional avatar image URL</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="demoVideo"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Demo Video URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter demo video URL"
                        onChange={onChange}
                        value={value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>Optional demo video URL</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <select
                        className={cn(
                          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        )}
                        {...field}
                      >
                        <option value="agent">Agent</option>
                        <option value="tool">Tool</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <TagsFormField />
              <WhoIsItForFormField />
              <KeyBenefitsFormField />
              <FeaturesFormField />
              <div className="flex justify-end space-x-2">
                <AutofillDialog />
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : id ? "Save Changes" : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function AutofillDialog() {
  const form = useFormContext<z.infer<typeof insertItemSchema>>();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = () => {
    startTransition(async () => {
      try {
        const { website, video } = await autofillItem({
          videoUrl: form.getValues("demoVideo") ?? null,
          websiteUrl: form.getValues("href") ?? null,
        });
        form.setValue("name", website.object.data.name);
        form.setValue("description", website.object.data.description);
        form.setValue("category", website.object.data.category);
        if (form.getValues("href") === null) {
          form.setValue("href", website.object.data.href);
        }
        if (form.getValues("avatar") === null) {
          form.setValue("avatar", website.object.data.avatar);
        }
        form.setValue(
          "tags",
          website.object.data.tags?.map((t) => t.toLowerCase()) ?? [],
        );
        if (video) {
          form.setValue("keybenefits", video.keybenefits);
          form.setValue("whoIsItFor", video.whoIsItFor);
          form.setValue(
            "features",
            video.features.map((f) => ({
              feature: f.feature,
              description: f.description,
              timestampStart: Math.round(f.timestampStart),
              timestampEnd: Math.round(f.timestampEnd),
            })),
          );
        }
        setIsOpen(false);
      } catch (error) {
        toast.error(`Failed to autofill item: ${error}`);
        console.error("Failed to autofill item:", error);
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          Autofill with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Autofill with AI</DialogTitle>
          <DialogDescription>Autofill the form with AI.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Demo Video URL
            </Label>
            <Input
              id="demoVideo"
              className="col-span-3"
              {...form.register("demoVideo")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Website URL
            </Label>
            <Input
              id="website"
              className="col-span-3"
              {...form.register("href")}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleGenerate} disabled={isPending}>
            {isPending ? "Generating..." : "Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TagsFormField() {
  const form = useFormContext<z.infer<typeof insertItemSchema>>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags" as never,
  });

  return (
    <FormField
      control={form.control}
      name="tags"
      render={() => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <FormControl>
                  <Input
                    {...form.register(`tags.${index}`)}
                    placeholder="Enter a tag"
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <span className="sr-only">Remove tag</span>✕
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append("")}
            >
              Add Tag
            </Button>
          </div>
          <FormDescription>
            Add tags to help categorize this item
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function WhoIsItForFormField() {
  const form = useFormContext<z.infer<typeof insertItemSchema>>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "whoIsItFor" as never,
  });

  return (
    <FormField
      control={form.control}
      name="whoIsItFor"
      render={() => (
        <FormItem>
          <FormLabel>Who is it for?</FormLabel>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <FormControl>
                  <Input
                    {...form.register(`whoIsItFor.${index}`)}
                    placeholder="Enter a use case"
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <span className="sr-only">Remove who is it for</span>✕
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append("")}
            >
              Add Who is it for
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function KeyBenefitsFormField() {
  const form = useFormContext<z.infer<typeof insertItemSchema>>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "keybenefits" as never,
  });

  return (
    <FormField
      control={form.control}
      name="keybenefits"
      render={() => (
        <FormItem>
          <FormLabel>Key Benefits</FormLabel>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <FormControl>
                  <Input
                    {...form.register(`keybenefits.${index}`)}
                    placeholder="Enter a key benefit"
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <span className="sr-only">Remove key benefit</span>✕
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append("")}
            >
              Add Key Benefit
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FeaturesFormField() {
  const form = useFormContext<z.infer<typeof insertItemSchema>>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  return (
    <FormField
      control={form.control}
      name="features"
      render={() => (
        <FormItem>
          <FormLabel>Features</FormLabel>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2 rounded-lg border p-4">
                <FormField
                  control={form.control}
                  name={`features.${index}.feature`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter feature name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`features.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter feature description"
                          className="min-h-[60px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`features.${index}.timestampStart`}
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Start Time (seconds)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Start time"
                            {...field}
                            value={value ?? ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              onChange(val ? Number.parseInt(val) : undefined);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`features.${index}.timestampEnd`}
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>End Time (seconds)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="End time"
                            {...field}
                            value={value ?? ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              onChange(val ? Number.parseInt(val) : undefined);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                  className="w-full"
                >
                  Remove Feature
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  feature: "",
                  description: "",
                  timestampStart: undefined,
                  timestampEnd: undefined,
                })
              }
            >
              Add Feature
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
