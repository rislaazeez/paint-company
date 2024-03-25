import Link from "next/link"

export default function HeroComponent() {
  return (
    <section className="w-full">
    <div className="container px-4 flex flex-col items-center justify-center gap-4 min-h-[calc(100vh_-_225px)] py-10 md:gap-10 md:flex-row md:py-16 lg:gap-20">
      <div className="mx-auto max-w-2xl space-y-4 md:space-y-3 md:order-last lg:order-first lg:max-w-3xl lg:space-y-5 xl:space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter lg:text-5xl xl:text-6xl/none">Let us Paint Your World</h1>
          <p className="text-gray-500 md:text-xl dark:text-gray-400">
            Experience the perfect blend of color and craftsmanship with our curated collection of premium paints.
          </p>
        </div>
        <Link
          className="inline-flex h-9 items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/products"
        >
          Explore all Products
        </Link>
      </div>
      <img
        alt="Hero"
        className="mx-auto aspect-[2/1] overflow-hidden rounded-t-xl object-cover md:rounded-t-none md:aspect-video lg:order-last"
        height="450"
        src="/male-painter-painting.webp"
        width="900"
      />
    </div>
  </section>
  )
}
