import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Pokemon Card Search</h1>
          <nav className="flex gap-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Search 22,755 Pokemon Cards</h2>
          <p className="text-muted-foreground">
            Try our free demo. Access the full API for your projects.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <div className="mb-4">
          <Skeleton className="h-6 w-48" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-card border border-border p-3">
              <Skeleton className="aspect-[2.5/3.5] w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 mt-3" />
              <Skeleton className="h-3 w-1/2 mt-2" />
              <Skeleton className="h-5 w-1/4 mt-2" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
