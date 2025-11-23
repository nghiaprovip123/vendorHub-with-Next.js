import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import ImageCard from '@/components/ui/image-card'

async function getCategories() {
    const res = await fetch("http://localhost:3000/api/categories");
    return res.json();
}

export default async function CategoriesPage() 
{
    const { categories } = await getCategories();
    return (
        <div className="ml-8 ">
            <h1 className="font-bold text-3xl">Feature Categories ({categories.length})</h1>
            <div className="mt-4 items-center gap-6 lg:flex cursor-pointer"> 
                {categories.map((c: any) => 
                    (
                        <ImageCard
                            key={c.cid}
                            caption={c.title}
                            imageUrl={c.image}
                        >
                        </ImageCard>
                    ))
                }
            </div>
        </div>

    );
}
