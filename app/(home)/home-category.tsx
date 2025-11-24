import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
  } from "@/components/ui/carousel"
  
  import ImageCard from "@/components/ui/image-card"
  
  async function getCategories() {
    const res = await fetch("http://localhost:3000/api/categories")
    return res.json()
  }
  export default async function CategoriesPage() {
    const { categories } = await getCategories()
  
    return (
      <div className="w-full flex flex-col items-center mt-10">
        <h1 className="font-bold text-5xl mb-6">
          Feature Categories ({categories.length})
        </h1>
  
        {/* Centered Carousel */}
        <Carousel className="w-full max-w-5xl relative">
          <CarouselContent className="flex items-center">
            {categories.map((c: any) => (
              <CarouselItem
                key={c.cid}
                className="lg:basis-1/6 flex justify-center"
              >
                <ImageCard className="cursor-pointer" caption={c.title} imageUrl={c.image} />
              </CarouselItem>
            ))}
          </CarouselContent>
  
          {/* Arrows on left & right */}
          <CarouselPrevious className="left-[-48] cursor-pointer" />
          <CarouselNext className="right-[-48] cursor-pointer" />
        </Carousel>
      </div>
    )
  }
  