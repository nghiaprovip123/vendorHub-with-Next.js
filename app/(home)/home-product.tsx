import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
  } from "@/components/ui/carousel"
  
  import ImageCard from "@/components/ui/image-card"
  
  async function getProducts() {
    const res = await fetch("http://localhost:3000/api/products")
    return res.json()
  }
  export default async function ProductsPage() {
    const { productList } = await getProducts()
    console.log(productList)
    const products = productList
    console.log(products)

    return (
      <div className="w-full flex flex-col items-center mt-10">
        <h1 className="font-bold text-5xl mb-6">
          Feature Categories ({products.length})
        </h1>
        
        {/* Centered Carousel */}
        <Carousel className="w-full max-w-5xl relative">
          <CarouselContent className="flex items-center">
            {products.map((p: any) => (
              <CarouselItem
                key={p.pid}
                className="lg:basis-1/6 flex justify-center"
              >
                <ImageCard className="cursor-pointer" caption={p.title} imageUrl={p.image} />
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
  