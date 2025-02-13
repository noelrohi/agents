import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto py-6 space-y-8">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-[200px]" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-5 w-[300px]" />
        </div>
        <Skeleton className="h-16 w-16 rounded-full" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Skeleton className="h-7 w-24 mb-2" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-[180px]" />
                  <Skeleton className="h-5 w-[150px]" />
                </div>
              </div>

              <div>
                <Skeleton className="h-7 w-24 mb-2" />
                <Skeleton className="h-5 w-32" />
              </div>

              <div>
                <Skeleton className="h-7 w-24 mb-2" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Skeleton className="aspect-video rounded-lg" />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-32" />
      </div>
    </main>
  );
}
